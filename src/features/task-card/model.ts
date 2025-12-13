import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { kyInstance } from '@/shared/api'
import { useAuth } from '@/shared/contexts/auth-context'
import { isBurningDayNear, isTaskBurned, prettyDateMaker } from '@/shared/lib/utils'
import { TApiResponse } from '@/shared/types/default-types'

import { Prisma, Task, TaskStatus } from '@/generated/client'

export const useTaskCard = (task: Task) => {
	const { id } = useParams<{ id: string }>()

	const { user } = useAuth()

	const queryClient = useQueryClient()

	const firedOnceRef = useRef(false)

	const { mutateAsync: mutateAsyncUpdateStatus } = useMutation({
		mutationFn: async (status: TaskStatus) => {
			const json = {
				id: task.id,
				payload: {
					status
				}
			}

			const res = await kyInstance
				.patch('tasks/update-status', {
					json
				})
				.json<TApiResponse<Task>>()

			return res.data
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['project', id] })

			const previousProject = queryClient.getQueryData<
				Prisma.ProjectGetPayload<{
					include: {
						tasks: true
						group: { include: { developers: { include: { user: true } } } }
					}
				}>
			>(['project', id])

			queryClient.setQueryData(
				['project', id],
				(old: Prisma.ProjectGetPayload<{ include: { tasks: true } }> | undefined) => {
					if (!old) return old

					const updatedProject = {
						...old,
						tasks: old.tasks.map(t =>
							t.id === task.id
								? {
										...t,
										status:
											task.status === 'IN_PROGRESS'
												? 'COMPLETED'
												: 'IN_PROGRESS'
									}
								: t
						)
					}

					return updatedProject
				}
			)

			return { previousProject }
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['project', id]
			})
		},
		onError: async (err, _, context) => {
			if (context?.previousProject) {
				queryClient.setQueryData(['project', id], () => context.previousProject)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message)
				}
			}

			return toast.error('Something went wrong')
		}
	})

	const handleDelete = useMutation({
		mutationFn: async () => {
			await kyInstance
				.delete(`tasks/delete`, { json: { id: task.id } })
				.json<TApiResponse<Task>>()
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['project', id] })

			const previousProject = queryClient.getQueryData<
				Prisma.ProjectGetPayload<{
					include: {
						tasks: true
						group: { include: { developers: { include: { user: true } } } }
					}
				}>
			>(['project', id])

			queryClient.setQueryData(
				['project', id],
				(
					old:
						| Prisma.ProjectGetPayload<{
								include: {
									tasks: true
									group: { include: { developers: { include: { user: true } } } }
								}
						  }>
						| undefined
				) => {
					if (!old) return old

					const updatedProjectTask = {
						...old,
						tasks: old.tasks.filter(t => t.id !== task.id)
					}
					return updatedProjectTask
				}
			)

			const toastId = toast.loading('Deleting task...')

			return { previousProject, toastId }
		},
		onError: async (err, _, context) => {
			if (context?.previousProject) {
				queryClient.setQueryData(['project', id], context.previousProject)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: context?.toastId })
				}
			}

			toast.error('Failed to delete the task. Please try again.', { id: context?.toastId })
		},
		onSuccess: async (_, __, context) => {
			await queryClient.invalidateQueries({ queryKey: ['project', id] })

			toast.success('Task deleted successfully.', { id: context?.toastId })
		}
	})

	const handleUpdateStatus = (status: TaskStatus) => {
		if (task.assignerId !== user?.id) return
		if (task.status === 'FIRED') return

		const now = new Date()

		const isDeadlinePassed = now.getTime() > new Date(task.deadlineAt).getTime()

		if (isDeadlinePassed) return toast.info('The deadline has already passed')

		mutateAsyncUpdateStatus(status)
	}

	const silentUpdate = (status: TaskStatus) => {
		if (task.status === 'FIRED') return

		const now = new Date()
		const isDeadlinePassed = now.getTime() > new Date(task.deadlineAt).getTime()

		const newStatus: TaskStatus = isDeadlinePassed ? 'FIRED' : status

		// Оптимистическое обновление UI
		queryClient.setQueryData<Prisma.ProjectGetPayload<{ include: { tasks: true } }>>(
			['project', id],
			old => {
				if (!old) return old
				return {
					...old,
					tasks: old.tasks.map(t => (t.id === task.id ? { ...t, status: newStatus } : t))
				}
			}
		)

		// Отправка запроса на сервер
		mutateAsyncUpdateStatus(newStatus).catch(() => {
			// При ошибке откатываемся к предыдущему состоянию
			queryClient.invalidateQueries({ queryKey: ['project', id] })
		})
	}

	useEffect(() => {
		if (!task.deadlineAt) return
		if (task.status !== 'IN_PROGRESS') return
		if (firedOnceRef.current) return

		const now = Date.now()
		const deadline = new Date(task.deadlineAt).getTime()

		if (now > deadline) {
			firedOnceRef.current = true
			silentUpdate('FIRED') // UI сразу обновится в FIRED
		}
	}, [task, id])

	return {
		firedOnceRef,
		handleDelete,
		handleUpdateStatus,
		isBurningDayNear,
		isTaskBurned,
		prettyDateMaker,
		isCreator: (user && task.creatorId === user.id) || false
	}
}
