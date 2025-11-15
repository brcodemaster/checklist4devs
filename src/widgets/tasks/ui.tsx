'use client'

import { CreateTaskTrigger } from '@/features/create-task-button'
import { TaskCard } from '@/features/task-card'

import { Input } from '@/shared/ui'

import { useTasks } from './model'
import { Prisma } from '@/generated/client'

export const Tasks: React.FC<{
	project: Prisma.ProjectGetPayload<{
		include: { tasks: true; group: { include: { developers: true } } }
	}>
}> = ({ project }) => {
	const { data, handleChange, filteredTasks, usersObject, debouncedValue } = useTasks(project)

	return (
		<>
			<div className='flex items-center justify-between gap-2 pt-8'>
				<Input placeholder='Filter tasks' onChange={e => handleChange(e.target.value)} />

				<CreateTaskTrigger users={project.group.developers} projectId={project.id} />
			</div>

			{filteredTasks.length > 0 ? (
				<div className='flex flex-col gap-2 pt-5 md:grid md:grid-cols-2 lg:grid-cols-3'>
					{filteredTasks.map((task, idx) => (
						<TaskCard
							key={task.id}
							task={task}
							index={data.tasks.length - idx}
							assignee={usersObject[task.assignerId]}
							creator={usersObject[task.creatorId]}
							users={project.group.developers}
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
