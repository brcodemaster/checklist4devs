'use client'

import { Search } from 'lucide-react'

import { CreateProjectTrigger } from '@/features/create-project-button'

import { RenderProjects } from '@/entities/render-projects'

import { Input } from '@/shared/ui'

import { useMyProjects } from './model'

export const MyProjects: React.FC = () => {
	const { projects, handleChange, isLoading } = useMyProjects()

	return (
		<>
			<div className='grid grid-cols-1 grid-rows-2 items-center gap-2 md:grid-cols-[1fr_auto_auto] md:grid-rows-1'>
				<div className='relative order-1 row-start-1 w-full'>
					<Input
						className='bg-input w-full pl-9 placeholder:opacity-50'
						placeholder='Search for an projects'
						onChange={e => handleChange(e.target.value)}
					/>
					<Search className='stroke-secondary-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
				</div>

				<div className='order-2 row-start-2 flex items-center gap-2 md:row-start-1'>
					<CreateProjectTrigger className='w-full md:w-fit' />
				</div>
			</div>

			<RenderProjects projects={projects} isLoading={isLoading} />
		</>
	)
}
