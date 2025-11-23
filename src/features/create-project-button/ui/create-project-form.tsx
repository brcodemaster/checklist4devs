import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { PROJECT_TYPE } from '@/shared/constants'
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

import { Prisma } from '@/generated/client'

import { TForm } from '../model'

export const CreateProjectForm: React.FC<{
	form: UseFormReturn<TForm, any, TForm>
	handleCreate: SubmitHandler<TForm>
	groups?: Prisma.GroupGetPayload<{ select: { id: true; name: true } }>[]
}> = ({ form, handleCreate, groups }) => {
	return (
		<Form {...form}>
			<form
				id='createProject'
				className='flex flex-col gap-4'
				onSubmit={form.handleSubmit(handleCreate)}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Project name
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
					name='groupId'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Add to group
							</FormLabel>
							<FormControl>
								<Select
									defaultValue={field.value}
									onValueChange={field.onChange}
									value={field.value}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select group to add project' />
									</SelectTrigger>
									<SelectContent>
										{groups &&
											groups.map(group => (
												<SelectItem key={group.id} value={group.id}>
													{group.name}
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
					name='isPublic'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Project visibility
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
					name='type'
					render={({ field }) => (
						<FormItem className='p-0 lg:grid-cols-2'>
							<FormLabel className='text-sm font-light text-white'>
								Project type
							</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									value={field.value}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select visibility' />
									</SelectTrigger>
									<SelectContent>
										{PROJECT_TYPE.map((type, idx) => (
											<SelectItem key={idx} value={type}>
												{type.replaceAll('_', ' ')}
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
