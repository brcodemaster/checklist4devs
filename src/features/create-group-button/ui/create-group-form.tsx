import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	InputPassword,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui'

import { TForm } from '../model'

export const CreateGroupForm: React.FC<{
	form: UseFormReturn<TForm>
	handleCreate: SubmitHandler<TForm>
}> = ({ form, handleCreate }) => {
	return (
		<Form {...form}>
			<form
				id='createGroup'
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(handleCreate)}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Group name
							</FormLabel>
							<FormControl>
								<Input
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='Bear coders'
									{...field}
								/>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='slug'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Group slug
							</FormLabel>
							<FormControl>
								<Input
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='We are strong bears'
									{...field}
								/>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='isPublic'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Group visibility
							</FormLabel>
							<FormControl>
								<Select
									onValueChange={value => field.onChange(value === 'public')}
									defaultValue={field.value ? 'public' : 'private'}
									value={field.value ? 'public' : 'private'}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select visibility' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='public'>Public</SelectItem>
										<SelectItem value='private'>Private</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Group password
							</FormLabel>
							<FormControl>
								<InputPassword
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='••••••••••'
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
