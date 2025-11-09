import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { kyInstance } from '@/shared/api'
import { useAuth } from '@/shared/contexts/auth-context'

import { Prisma, Task, User } from '@/generated/client'

const formSchema = z.object({
	text: z
		.string({ error: 'Required field' })
		.min(3, { error: 'Task must be at least 3 characters' }),
	assignerId: z.string(),
	deadline: z.date()
})

export type TForm = z.infer<typeof formSchema>

export const useCreateTask = (projectId: string, users: User[]) => {
	const { user } = useAuth()

	const defaultValues = {
		text: '',
		assignerId: users[0].id,
		deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
	} as TForm

	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationFn: async (payload: TForm) => {
			const json = {
				deadlineAt: payload.deadline,
				text: payload.text,
				assignerId: payload.assignerId,
				projectId,
				creatorId: user?.id
			} as Task

			return await kyInstance.post('tasks/create', { json }).json<Task>()
		},
		onMutate: async (payload: TForm) => {
			await queryClient.cancelQueries({ queryKey: ['project', projectId] })

			const previousProject = queryClient.getQueryData<
				Prisma.ProjectGetPayload<{
					include: { tasks: true; group: { include: { developers: true } } }
				}>
			>(['project', projectId])

			queryClient.setQueryData(
				['project', projectId],
				(
					old:
						| Prisma.ProjectGetPayload<{
								include: { tasks: true; group: { include: { developers: true } } }
						  }>
						| undefined
				) => {
					if (!old) return old

					const updatedProject = {
						...old,
						tasks: [
							{
								id: crypto.randomUUID(),
								text: payload.text,
								assignerId: payload.assignerId,
								deadlineAt: payload.deadline
							},
							...old.tasks
						]
					} as Prisma.ProjectGetPayload<{
						include: { tasks: true; group: { include: { developers: true } } }
					}>

					return updatedProject
				}
			)

			const toastId = toast.loading('Creating task...')

			return { previousProject, toastId }
		},
		onError: async (err, _, context) => {
			if (context?.previousProject) {
				queryClient.setQueryData(['project', projectId], context.previousProject)
			}

			form.reset(defaultValues)

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: context?.toastId })
				}
			}

			toast.error('Failed to create the task. Please try again.', { id: context?.toastId })
		},
		onSuccess: async (_, __, context) => {
			await queryClient.invalidateQueries({ queryKey: ['project', projectId] })

			setIsOpen(false)
			form.reset(defaultValues)

			toast.success('Task created successfully.', { id: context?.toastId })
		}
	})

	const handleCreate: SubmitHandler<TForm> = data => mutateAsync(data)

	const handleReset = () => form.reset(defaultValues)

	return { handleCreate, isOpen, onOpenChange: setIsOpen, form, handleReset }
}
