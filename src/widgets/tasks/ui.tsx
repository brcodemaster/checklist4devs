'use client'

import { CreateTaskTrigger } from '@/features/create-task-button'
import { TaskCard } from '@/features/task-card'

import { Input } from '@/shared/ui'

import { useTasks } from './model'
import { Prisma, User } from '@/generated/client'

export const Tasks: React.FC<{
	project: Prisma.ProjectGetPayload<{
		include: { tasks: true; group: { include: { developers: true } } }
	}>
	users: User[]
}> = ({ project, users }) => {
	const { data, handleChange, filteredTasks, usersObject } = useTasks(project)

	return (
		<>
			<div className='flex items-center justify-between gap-2 pt-8'>
				<Input placeholder='Filter tasks' onChange={e => handleChange(e.target.value)} />

				<CreateTaskTrigger users={project.group.developers} projectId={project.id} />
			</div>

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
		</>
	)
}
