import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { kyInstance } from '@/shared/api'
import { useAuth } from '@/shared/contexts/auth-context'

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
	const { user } = useAuth()

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
			const json = {
				name: payload.name,
				slug: payload.slug,
				creatorId: user?.id,
				isPublic: payload.isPublic,
				password: payload.password
			}

			return await kyInstance.post('groups/create', { json }).json<Group>()
		},
		onMutate: async (payload: TForm) => {
			await queryClient.cancelQueries({ queryKey: ['groups'] })

			const previousGroups = queryClient.getQueryData<Group[]>(['groups'])

			queryClient.setQueryData(['groups'], (old: Group[] | undefined) => {
				if (!old) return old

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

			const toastId = toast.loading('Creating group...')

			return { previousGroups, toastId }
		},
		onError: async (err, _, context) => {
			if (context?.previousGroups) {
				queryClient.setQueryData(['groups'], context.previousGroups)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: context?.toastId })
				}
			}

			toast.error('Failed to create the group. Please try again.', { id: context?.toastId })
		},
		onSuccess: async (_, __, context) => {
			await queryClient.invalidateQueries({ queryKey: ['groups'] })
			setIsOpen(false)
			handleReset()

			toast.success('Group created successfully.', { id: context.toastId })
		}
	})

	const handleCreate: SubmitHandler<TForm> = data => mutateAsync(data)

	const handleReset = () => form.reset(defaultValues)

	return { handleCreate, isOpen, onOpenChange: setIsOpen, form, handleReset }
}
