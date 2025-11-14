'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { kyInstance } from '@/shared/api'
import { useAuth } from '@/shared/contexts/auth-context'

import { User } from '@/generated/client'

const formSchema = z.object({
	email: z.email({ error: 'Please enter a valid email address' }),
	userName: z
		.string({ error: 'Required field' })
		.min(3, { error: 'User name must be at least 3 characters long' }),
	password: z
		.string()
		.optional()
		.refine(
			val => {
				if (!val) return true
				return val.length >= 6
			},
			{ message: 'Password must be at least 6 characters long' }
		)
		.refine(
			val => {
				if (!val) return true
				return /[A-Z]/.test(val)
			},
			{ message: 'Password must contain at least one uppercase letter' }
		)
		.refine(
			val => {
				if (!val) return true
				return /\d/.test(val)
			},
			{ message: 'Password must contain at least one number' }
		)
})
export type TForm = z.infer<typeof formSchema>

export const useAccountForms = (user: User) => {
	const { checkAuth } = useAuth()

	const router = useRouter()

	const defaultValues = {
		email: user.email,
		userName: user.userName,
		password: ''
	} as TForm

	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const { mutateAsync: mutateAsyncUpdate } = useMutation({
		mutationFn: async (payload: TForm) => {
			const group = {
				id: user.id,
				payload
			}

			return await kyInstance.patch('users/update', { json: group }).json<User>()
		},
		onMutate: async () => {
			const toastId = toast.loading('Updating account...')

			return { toastId }
		},
		onSuccess: (_, __, context) => {
			checkAuth()

			return toast.success('Account updated successfully', { id: context.toastId })
		},
		onError: async (err, _, context) => {
			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: context?.toastId })
				}
			}

			return toast.error('Something went wrong', { id: context?.toastId })
		}
	})

	const { mutateAsync: mutateAsyncDelete } = useMutation({
		mutationFn: async () => {
			const json = {
				id: user.id
			}

			await kyInstance.delete('users/delete', { json }).json<User>()
		},
		onMutate: async () => {
			const toastId = toast.loading('Deleting account...')

			return { toastId }
		},
		onSuccess: async (_, __, context) => {
			router.push('/auth/login')

			return toast.success('Account deleted successfully', { id: context.toastId })
		},
		onError: async (err, _, context) => {
			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: context?.toastId })
				}
			}

			return toast.error('Something went wrong', { id: context?.toastId })
		}
	})

	const handleSubmit: SubmitHandler<TForm> = data => mutateAsyncUpdate(data)

	const handleDelete = () => mutateAsyncDelete()

	const handleReset = () => form.reset(defaultValues)

	return { form, handleDelete, handleSubmit, handleReset }
}
