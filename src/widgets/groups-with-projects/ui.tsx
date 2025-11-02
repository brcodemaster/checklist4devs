'use client'

import { Search } from 'lucide-react'

import { CreateGroupButton } from '@/features/create-group-button'
import { CreateProjectButton } from '@/features/create-project-button'

import { RenderGroups } from '@/entities/render-groups'
import { RenderProjects } from '@/entities/render-projects'

import { Input } from '@/shared/ui'

import { useGroups } from './model'

export const GroupsWithProjects: React.FC = () => {
	const { groups, projects, groupsIsLoading, projectsIsLoading, handleChange } = useGroups()

	return (
		<>
			<div className='grid grid-cols-1 grid-rows-2 items-center gap-2 md:grid-cols-[1fr_auto_auto] md:grid-rows-1'>
				<div className='relative order-1 row-start-1 w-full'>
					<Input
						className='bg-input w-full pl-10 placeholder:opacity-50'
						placeholder='Search for an groups or projects'
						onChange={e => handleChange(e.target.value)}
					/>
					<Search className='stroke-secondary-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2' />
				</div>

				<div className='order-2 row-start-2 flex items-center gap-2 md:row-start-1'>
					<CreateGroupButton className='w-full md:w-fit' />
					<CreateProjectButton className='w-full md:w-fit' />
				</div>
			</div>

			<RenderGroups groups={groups} isLoading={groupsIsLoading} />
			<RenderProjects projects={projects} isLoading={projectsIsLoading} />
		</>
	)
}
