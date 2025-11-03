import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { kyInstance } from '@/shared/api'

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

type TForm = z.infer<typeof formSchema>

export const useLogin = () => {
	const defaultValues = {
		email: '',
		password: ''
	}

	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const handleSubmit: SubmitHandler<TForm> = async data => {
		await kyInstance.post('auth/login', { json: data }).json()
	}

	return { form, handleSubmit }
}
