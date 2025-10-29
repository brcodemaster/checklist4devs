'use client'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea
} from '@/shared/ui'

import { useFeedback } from '../useFeedback'

export const FeedbackModal: React.FC<{ hook: ReturnType<typeof useFeedback> }> = ({ hook }) => {
	const { form, handleSubmit, handleReset } = hook

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='flex flex-col gap-4 md:pt-5'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm font-light text-white'>Name</FormLabel>
							<FormControl>
								<Input
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='Enter your name'
									{...field}
								/>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm font-light text-white'>Email</FormLabel>
							<FormControl>
								<Input
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='Enter your email'
									{...field}
								/>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm font-light text-white'>Message</FormLabel>
							<FormControl>
								<Textarea
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='Enter your message'
									{...field}
								/>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>
				<div className='flex items-center justify-end gap-2'>
					<Button variant='secondary' type='button' onClick={handleReset}>
						Reset
					</Button>
					<Button>Send</Button>
				</div>
			</form>
		</Form>
	)
}
