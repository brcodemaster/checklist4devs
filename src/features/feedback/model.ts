import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { sendMessage } from '@/shared/services'

export const formSendMessageSchema = z.object({
	name: z.string().min(3, { error: 'Your name should be at least 3 characters long' }),
	email: z.email({ error: 'Please enter a valid email address' }),
	message: z
		.string({ error: 'Please fill the field' })
		.min(3, { error: 'Your message should be at least 3 characters long' })
		.max(500, { error: 'Your message cannot exceed 500 characters' })
})

type TForm = z.infer<typeof formSendMessageSchema>

export const useFeedback = () => {
	const [isOpen, setIsOpen] = useState(false)

	const defaultValues = {
		name: '',
		email: '',
		message: ''
	}

	const form = useForm<TForm>({
		resolver: zodResolver(formSendMessageSchema),
		mode: 'onSubmit',
		defaultValues
	})

	const handleSubmit: SubmitHandler<TForm> = data => {
		sendMessage(data, handleReset, () => setIsOpen(false))
	}

	const handleReset = () => form.reset(defaultValues)

	return {
		form,
		handleSubmit,
		handleReset,
		isOpen,
		onOpenChange: (value: boolean) => setIsOpen(value)
	}
}
