import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { kyInstance } from '@/shared/api'

import { Group } from '@/generated/client'

const formSchema = z.object({
	name: z
		.string({ error: 'Required field' })
		.min(3, { error: 'Group name must be at least 3 characters' }),
	slug: z
		.string({ error: 'Required field' })
		.min(3, { error: 'Group slug must be at least 3 characters' }),
	isPublic: z.boolean(),
	password: z
		.string({ error: 'Password' })
		.min(3, { error: 'Group password must be at least 3 characters' })
})

export type TForm = z.infer<typeof formSchema>

export const useCreateGroup = () => {
	const defaultValues = {
		name: '',
		password: '',
		isPublic: true,
		slug: ''
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
			const newGroup = {
				name: payload.name,
				slug: payload.slug,
				creatorId: '',
				isPublic: payload.isPublic,
				password: payload.password
			}

			console.log(newGroup)

			return await kyInstance.post('groups/create', { json: newGroup }).json<Group>()
		},
		onMutate: async (payload: TForm) => {
			await queryClient.cancelQueries({ queryKey: ['groups'] })

			const previousGroups = queryClient.getQueryData<Group[]>(['groups'])

			await queryClient.setQueryData(['groups'], (old: Group[] | undefined) => {
				if (!old) return { previousGroups }

				const now = new Date()

				const group = {
					id: crypto.randomUUID(),
					name: payload.name,
					slug: payload.slug,
					password: payload.password,
					creatorId: '',
					createdAt: now,
					updatedAt: now
				}

				return [...old, group]
			})

			return { previousGroups }
		},
		onError: async (err, _, context) => {
			if (context?.previousGroups) {
				await queryClient.setQueryData(['groups'], context.previousGroups)
			}

			toast.error('Failed to create the group. Please try again.')
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['groups'] })

			toast.success('Group created successfully.')
		}
	})

	const handleCreate: SubmitHandler<TForm> = data => mutateAsync(data)

	const handleReset = () => form.reset(defaultValues)

	return { handleCreate, isOpen, onOpenChange: setIsOpen, form, handleReset }
}
