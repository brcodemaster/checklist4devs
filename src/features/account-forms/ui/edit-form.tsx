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
	InputPassword
} from '@/shared/ui'

import { User } from '@/generated/index'

import { useAccountForms } from '../model'

export const EditForm: React.FC<{ user: User }> = ({ user }) => {
	const { form, handleSubmit, handleReset } = useAccountForms(user)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='bg-input border-muted-secondary/80 mt-4 flex flex-col rounded-lg border'
			>
				<div className='flex flex-col gap-4 py-6'>
					<FormField
						control={form.control}
						name='userName'
						render={({ field }) => (
							<FormItem className='grid px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Username
								</FormLabel>
								<FormControl>
									<Input
										className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
										{...field}
										placeholder={'Enter user name'}
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
							<FormItem className='grid px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Email
								</FormLabel>
								<FormControl>
									<Input
										className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
										{...field}
										placeholder={'Enter email'}
									/>
								</FormControl>
								<FormMessage className='col-end-3' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='grid grid-cols-1 px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Password
								</FormLabel>
								<FormControl>
									<InputPassword
										className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
										{...field}
										placeholder={'Enter password'}
									/>
								</FormControl>
								<FormMessage className='col-end-3' />
							</FormItem>
						)}
					/>
				</div>
				<div className='border-t-muted-secondary/80 flex items-center justify-end gap-2 border-t p-4 px-6'>
					<Button size='sm' variant='secondary' type='reset' onClick={handleReset}>
						Reset
					</Button>
					<Button size='sm' type='submit'>
						Update
					</Button>
				</div>
			</form>
		</Form>
	)
}
