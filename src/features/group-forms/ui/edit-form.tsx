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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui'

import { useGroupForms } from '../model'

type Props = {
	name: string
	slug: string | null
	isPublic: boolean
}

export const EditForm: React.FC<Props> = ({ isPublic, name, slug }) => {
	const { form, handleSubmit, handleReset } = useGroupForms(name, slug, isPublic)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='bg-input border-muted-secondary/80 mt-4 flex flex-col rounded-lg border'
			>
				<div className='flex flex-col gap-4 py-6'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='grid px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Name
								</FormLabel>
								<FormControl>
									<Input
										className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
										{...field}
										placeholder={'Enter group name'}
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
							<FormItem className='grid grid-cols-1 px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Slug
								</FormLabel>
								<FormControl>
									<Input
										className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
										{...field}
										placeholder={'Enter group slug'}
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
							<FormItem className='grid grid-cols-1 px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Visibility
								</FormLabel>
								<FormControl>
									<Select
										value={String(field.value)}
										onValueChange={val => field.onChange(val === 'true')}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Group visibility' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value={String(false)}>Private</SelectItem>
											<SelectItem value={String(true)}>Public</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage className='col-end-3' />
							</FormItem>
						)}
					/>
				</div>
				<div className='border-t-muted-secondary/80 flex items-center justify-end gap-2 border-t p-4 px-6'>
					<Button size='sm' variant='secondary' type='reset' onClick={handleReset}>
						Cancel
					</Button>
					<Button size='sm' type='submit'>
						Save
					</Button>
				</div>
			</form>
		</Form>
	)
}
