import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { cn } from '@/shared/lib'
import {
	Button,
	Calendar,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea
} from '@/shared/ui'

import { User } from '@/generated/client'

import { TForm } from '../model'

export const CreateTaskForm: React.FC<{
	form: UseFormReturn<TForm>
	handleCreate: SubmitHandler<TForm>
	users: User[]
}> = ({ form, handleCreate, users }) => {
	return (
		<Form {...form}>
			<form
				id='createGroup'
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(handleCreate)}
			>
				<FormField
					control={form.control}
					name='assignerId'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Assign to
							</FormLabel>
							<FormControl>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select assignee' />
									</SelectTrigger>
									<SelectContent>
										{users.map(user => (
											<SelectItem key={user.id} value={user.id}>
												{user.userName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='text'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>Task</FormLabel>
							<FormControl>
								<Textarea
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='Enter task text'
									{...field}
								/>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='tag'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>Tag</FormLabel>
							<FormControl>
								<Input
									className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
									placeholder='Enter tag'
									{...field}
								/>
							</FormControl>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='deadline'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Deadline at
							</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant='ghost'
											className={cn(
												'border-muted-secondary w-full border bg-neutral-800',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Select deadline date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto border-none p-0' align='center'>
									<Calendar
										className='border-muted-secondary border'
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										captionLayout='dropdown'
										disabled={date => {
											const today = new Date()
											today.setHours(0, 0, 0, 0)

											const tomorrow = new Date(today)
											tomorrow.setDate(today.getDate() + 1)

											return date < today
										}}
									/>
								</PopoverContent>
							</Popover>
							<FormMessage className='col-end-3' />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
