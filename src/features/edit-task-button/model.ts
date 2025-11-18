'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { kyInstance } from '@/shared/api'
import { useAuth } from '@/shared/contexts/auth-context'
import { TApiResponse, TTaskUpdate } from '@/shared/types/default-types'

import { Prisma, Task } from '@/generated/client'

const formSchema = z.object({
	text: z
		.string({ error: 'Required field' })
		.min(3, { error: 'Task must be at least 3 characters' }),
	assignerId: z.string(),
	deadline: z.date(),
	tag: z.optional(z.string({ error: 'Required field' })),
	projectId: z.string()
})

export type TForm = z.infer<typeof formSchema>

export const useEditTask = (task: Task) => {
	const [isOpen, setIsOpen] = useState(false)

	const { id } = useParams<{ id: string }>()
	const { user } = useAuth()

	const queryClient = useQueryClient()

	const defaultValues = {
		assignerId: task.assignerId,
		deadline: new Date(task.deadlineAt),
		projectId: id,
		tag: task.tag || '',
		text: task.text
	} as TForm

	const { mutateAsync: mutateAsyncEdit } = useMutation({
		mutationKey: ['editedTask', task.id],
		mutationFn: async (payload: TTaskUpdate) => {
			const json = {
				userId: user?.id,
				id: payload.id,
				payload
			}

			const res = await kyInstance.patch(`tasks/update`, { json }).json<TApiResponse<Task>>()

			return res.data
		},
		onMutate: async (payload: TTaskUpdate) => {
			await queryClient.cancelQueries({ queryKey: ['project', id] })

			const previousProject = queryClient.getQueryData<
				Prisma.ProjectGetPayload<{ include: { tasks: true } }>
			>(['project', id])

			if (task.status !== 'IN_PROGRESS') return { previousProject }

			await queryClient.setQueryData(
				['project', id],
				(old: Prisma.ProjectGetPayload<{ include: { tasks: true } }> | undefined) => {
					if (!old) return old

					const updatedProjectTask = {
						...old,
						tasks: old.tasks.map(t => {
							if (t.id === payload.id) return payload

							return t
						})
					}

					return updatedProjectTask
				}
			)

			const toastId = toast.loading('Updating task...')

			return { previousProject, toastId }
		},
		onSuccess: async (_, __, context) => {
			await queryClient.invalidateQueries({ queryKey: ['project', id] })

			setIsOpen(false)

			return toast.success('Task updated successfully', { id: context?.toastId })
		},
		onError: async (err, _, context) => {
			form.reset(defaultValues)

			if (context?.previousProject) {
				queryClient.setQueryData(['project', id], () => context?.previousProject)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: context?.toastId })
				}
			}

			return toast.error('Something went wrong', { id: context?.toastId })
		}
	})

	const form = useForm<TForm>({
		resolver: zodResolver(formSchema),
		mode: 'onSubmit',
		defaultValues
	})

	const handleEdit: SubmitHandler<TForm> = data => {
		mutateAsyncEdit({
			...task,
			assignerId: data.assignerId,
			deadlineAt: data.deadline,
			text: data.text,
			tag: data.tag
		})
	}

	const handleReset = () => form.reset(defaultValues)

	return { handleEdit, form, handleReset, onOpenChange: setIsOpen, isOpen }
}
