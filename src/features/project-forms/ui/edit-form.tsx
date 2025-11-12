'use client'

import { Minus, Plus } from 'lucide-react'

import { PROJECT_STATUS, PROJECT_TYPE } from '@/shared/constants'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	InputLink,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui'

import { Prisma } from '@/generated/client'

import { useProjectForms } from '../model'

type Props = {
	project: Prisma.ProjectGetPayload<{
		include: { tasks: true; group: { include: { developers: true } } }
	}>
}

export const EditForm: React.FC<Props> = ({ project }) => {
	const { form, handleSubmit, handleReset, fields, append, remove } = useProjectForms(project)

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
										placeholder={'Enter project name'}
									/>
								</FormControl>
								<FormMessage className='col-end-3' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='type'
						render={({ field }) => (
							<FormItem className='grid grid-cols-1 px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Type
								</FormLabel>
								<FormControl>
									<Select
										value={String(field.value)}
										onValueChange={val => field.onChange(val)}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Project type' />
										</SelectTrigger>
										<SelectContent>
											{PROJECT_TYPE.map((type, idx) => (
												<SelectItem value={type} key={type + idx}>
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
						name='status'
						render={({ field }) => (
							<FormItem className='grid grid-cols-1 px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Status
								</FormLabel>
								<FormControl>
									<Select
										value={String(field.value)}
										onValueChange={val => field.onChange(val)}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Project status' />
										</SelectTrigger>
										<SelectContent>
											{Object.values(PROJECT_STATUS).map((type, idx) => (
												<SelectItem value={type} key={type + idx}>
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
											<SelectValue placeholder='Project visibility' />
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
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='grid px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Password
								</FormLabel>
								<FormControl>
									<Input
										className='placeholder:text-secondary-foreground h-9 bg-neutral-800 placeholder:text-sm md:h-10'
										{...field}
										placeholder={'Enter project password'}
									/>
								</FormControl>
								<FormMessage className='col-end-3' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='links'
						render={({ field: _field }) => (
							<FormItem className='grid px-6 lg:grid-cols-2'>
								<FormLabel className='text-sm font-light text-white lg:text-base'>
									Links
								</FormLabel>
								<FormControl>
									<div className='flex flex-col gap-2'>
										{fields.map((field, idx) => (
											<InputLink
												key={field.id}
												value={form.watch(`links.${idx}.value`)}
												onChange={e =>
													form.setValue(
														`links.${idx}.value`,
														e.target.value,
														{
															shouldDirty: true
														}
													)
												}
												icon={Minus}
												handleClick={() => remove(idx)}
												className='h-10 pr-10'
												placeholder='Enter project link'
											/>
										))}

										<div className='group/add relative'>
											<InputLink
												icon={Plus}
												handleClick={value => append({ value })}
												className='h-10 pr-10'
												placeholder='Enter project link'
											/>
										</div>
									</div>
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
