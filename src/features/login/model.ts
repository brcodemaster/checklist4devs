import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from '@/shared/contexts/auth-context'

const formSchema = z.object({
	email: z.email({ error: 'Please enter a valid email address' }),
	password: z
		.string({ error: 'Password must be at least 6 characters long' })
		.min(6)
		.refine(val => /[A-Z]/.test(val), {
			message: 'Password must contain at least one uppercase letter'
		})
		.refine(val => /\d/.test(val), {
			message: 'Password must contain at least one number'
		})
})

export type TLoginForm = z.infer<typeof formSchema>

export const useLogin = () => {
	const { login, isLoading } = useAuth()

	const defaultValues = {
		email: '',
		password: ''
	}

	const form = useForm<TLoginForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const handleSubmit: SubmitHandler<TLoginForm> = data => login(data)

	return { form, handleSubmit, isLoading }
}
