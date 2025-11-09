import { toast } from 'sonner'

import { TFormSendMessage } from '../types/form-types'

export const sendMessage = async (
	data: TFormSendMessage,
	onSend: VoidFunction,
	onSuccess: (value: boolean) => void
) => {
	const url = `${process.env.NEXT_PUBLIC_TELEGRAM_URL}/bot${process.env.NEXT_PUBLIC_TELEGRAM_TOKEN}/sendMessage`

	const text = `Message from Checklist4Devs \n\nName: ${data.name},\nEmail: ${data.email},\nMessage: ${data.message}`

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id: process.env.NEXT_PUBLIC_CHAT_ID,
				text,
				parse_mode: 'Markdown'
			})
		})

		if (!res.ok) {
			throw new Error()
		}

		onSuccess(false)
		return toast.success('Feedback send successfully!')
	} catch {
		return toast.error('Something went wrong please try later!')
	} finally {
		onSend()
	}
}
