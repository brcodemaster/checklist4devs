import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/ui'

import { TForm } from '../model'

export const InviteMemberForm: React.FC<{
	form: UseFormReturn<TForm, any, TForm>
	handleInvite: SubmitHandler<TForm>
}> = ({ form, handleInvite }) => {
	return (
		<Form {...form}>
			<form
				id='createProject'
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(handleInvite)}
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Member email
							</FormLabel>
							<FormControl>
								<Input
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='exampleuser@gmail.com'
									{...field}
								/>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
