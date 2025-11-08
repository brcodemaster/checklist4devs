import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from '@/shared/contexts/auth-context'

const formSchema = z.object({
	email: z.email({ error: 'Please enter a valid email address' }),
	password: z
		.string({ error: 'Required field' })
		.min(6, { error: 'Password must be at least 6 characters long' })
		.refine(val => /[A-Z]/.test(val), {
			message: 'Password must contain at least one uppercase letter'
		})
		.refine(val => /\d/.test(val), {
			message: 'Password must contain at least one number'
		}),
	userName: z
		.string({ error: 'Required field' })
		.min(3, { error: 'User name must be at least 3 characters long' })
})

export type TRegisterForm = z.infer<typeof formSchema>

export const useRegister = () => {
	const { register, isLoading } = useAuth()

	const defaultValues = {
		email: '',
		password: '',
		userName: ''
	}

	const form = useForm<TRegisterForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const handleSubmit: SubmitHandler<TRegisterForm> = data => register(data)

	return { form, handleSubmit, isLoading }
}
