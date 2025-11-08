import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { kyInstance } from '@/shared/api'

import { Project } from '@/generated/client'
import { ProjectType } from '@/generated/enums'

const formSchema = z.object({
	name: z
		.string({ error: 'Required field' })
		.min(3, { error: 'Project name must be at least 3 characters' }),
	password: z
		.string({ error: 'Required field' })
		.min(3, { error: 'Group password must be at least 3 characters' }),
	isPublic: z.boolean(),
	type: z.enum(ProjectType),
	groupId: z.string()
})

export type TForm = z.infer<typeof formSchema>

export const useCreateProject = () => {
	const defaultValues = {
		groupId: '',
		isPublic: true,
		name: '',
		password: '',
		type: 'CMS'
	} as TForm

	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationFn: async (payload: TForm) =>
			await kyInstance.post('projects/create', { json: payload }).json<Project>(),
		onMutate: async (payload: TForm) => {
			await queryClient.cancelQueries({ queryKey: ['projects'] })

			const previousProjects = queryClient.getQueryData(['projects'])

			queryClient.setQueryData(['projects'], (old: Project[] | undefined) => {
				if (!old) return old

				const now = new Date()

				const newProject = {
					id: crypto.randomUUID(),
					name: payload.name,
					createdAt: now,
					updatedAt: now,
					creatorId: '',
					groupId: '',
					status: 'IN_DEVELOPMENT',
					password: payload.password,
					type: 'BLOG'
				} as Project

				return [...old, newProject]
			})

			return { previousProjects }
		},
		onError: async (err, _, context) => {
			if (context?.previousProjects) {
				queryClient.setQueryData(['projects'], context?.previousProjects)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message)
				}
			}

			toast.error('Failed to create the project. Please try again.')
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['projects'] })

			toast.success('Group created successfully.')
		}
	})

	const handleCreate: SubmitHandler<TForm> = data => mutateAsync(data)

	const handleReset = () => form.reset(defaultValues)

	return { handleCreate, isOpen, onOpenChange: setIsOpen, handleReset, form }
}
