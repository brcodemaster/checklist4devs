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

import { Project } from '@/generated/client'

const formSchema = z.object({
	email: z.email({ error: 'Please enter a valid email address' })
})

export type TForm = z.infer<typeof formSchema>

export const useInviteMember = (adminIds: string[]) => {
	const { user } = useAuth()

	const { id } = useParams<{ id: string }>()

	const defaultValues = {
		email: ''
	} as TForm

	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const isUserAdmin = adminIds.some(admin => admin === user?.id)

	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationFn: async (payload: TForm & { toastId: string | number }) => {
			const json = {
				invitedUserEmail: payload.email,
				groupId: id
			}

			await kyInstance.post('users/invite', { json }).json<Project>()
		},
		onError: async (err, variables) => {
			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: variables.toastId })
				}
			}

			form.reset(defaultValues)

			return toast.error('Something went wrong', { id: variables.toastId })
		},
		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries({ queryKey: ['notifications'] })

			setIsOpen(false)
			form.reset(defaultValues)

			return toast.success('Invitation sended successfully.', { id: variables.toastId })
		}
	})

	const handleInvite: SubmitHandler<TForm> = data => {
		const toastId = toast.loading('Sending invitation')

		mutateAsync({ email: data.email, toastId })
	}

	const handleReset = () => form.reset(defaultValues)

	return { handleInvite, isOpen, onOpenChange: setIsOpen, handleReset, form, isUserAdmin }
}
