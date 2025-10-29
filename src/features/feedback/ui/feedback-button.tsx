'use client'

import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui'

import { FeedbackModal } from './feedback-modal'

import { useFeedback } from '../useFeedback'

export const FeedbackButton: React.FC = () => {
	const feedback = useFeedback()

	return (
		<Dialog open={feedback.isOpen} onOpenChange={() => feedback.onOpenChange(!feedback.isOpen)}>
			<DialogTrigger asChild>
				<Button
					onClick={() => feedback.onOpenChange(true)}
					variant='secondary'
					className='h-8 rounded-full p-3 text-xs'
				>
					Feedback
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Send Feedback</DialogTitle>

				<FeedbackModal hook={feedback} />
			</DialogContent>
		</Dialog>
	)
}
