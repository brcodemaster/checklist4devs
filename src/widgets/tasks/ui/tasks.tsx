'use client'

import { Search } from 'lucide-react'

import { CreateTaskTrigger } from '@/features/create-task-button'
import { TaskCard } from '@/features/task-card'

import { Input } from '@/shared/ui'

import { FilterDate } from './filter-date'
import { FilterStatus } from './filter-status'
import { Prisma } from '@/generated/client'

import { useTasks } from '../model'

export const Tasks: React.FC<{
	project: Prisma.ProjectGetPayload<{
		include: { tasks: true; group: { include: { developers: { include: { user: true } } } } }
	}>
}> = ({ project }) => {
	const {
		data,
		handleChange,
		filteredTasks,
		usersObject,
		debouncedValue,
		dateValue,
		setDateValue,
		setStatusValue,
		statusValue,
		users
	} = useTasks(project)

	return (
		<>
			<div className='mt-10 grid grid-cols-1 grid-rows-2 items-center gap-2 md:grid-cols-[1fr_auto] md:grid-rows-1'>
				<div className='relative order-1 row-start-1 w-full'>
					<div className='flex items-center gap-2'>
						<Input
							className='bg-input w-full pl-9 placeholder:opacity-50'
							placeholder='Search for tasks'
							onChange={e => handleChange(e.target.value)}
						/>
						<Search className='stroke-secondary-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />

						<FilterDate dateValue={dateValue} setDateValue={setDateValue} />
					</div>
				</div>

				<div className='order-2 row-start-2 flex items-center gap-2 md:row-start-1'>
					<FilterStatus statusValue={statusValue} setStatusValue={setStatusValue} />
					<CreateTaskTrigger
						className='w-full'
						users={users}
						projectId={project.id}
						lastIndex={data.tasks.length}
					/>
				</div>
			</div>

			{filteredTasks.length > 0 ? (
				<div className='flex flex-col gap-2 pt-5 md:grid md:grid-cols-2 lg:grid-cols-3'>
					{filteredTasks.map(task => (
						<TaskCard
							key={task.id}
							task={task}
							index={task.index}
							assignee={usersObject[task.assignerId]}
							creator={usersObject[task.creatorId]}
							users={users}
						/>
					))}
				</div>
			) : debouncedValue.trim() ? (
				<div className='text-secondary-foreground flex min-h-36 grow flex-col items-center justify-center gap-3 text-center'>
					Results for &quot;{debouncedValue}&quot; not found
				</div>
			) : (
				<div className='text-secondary-foreground flex min-h-36 grow flex-col items-center justify-center gap-3 text-center'>
					Tasks not found
				</div>
			)}
		</>
	)
}
