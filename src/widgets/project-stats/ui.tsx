'use client'

import { useQuery } from '@tanstack/react-query'

import { Prisma } from '@/generated/client'

type Props = {
	projectId: string
}

export const ProjectStats: React.FC<Props> = ({ projectId }) => {
	const { data: project } = useQuery<Prisma.ProjectGetPayload<{ include: { tasks: true } }>>({
		queryKey: ['project', projectId],
		queryFn: async () => Promise.reject('No fetch needed'),
		enabled: false
	})

	const completed = project?.tasks.filter(task => task.status === 'COMPLETED').length
	const inProgress = project?.tasks.filter(task => task.status === 'IN_PROGRESS').length
	const fired = project?.tasks.filter(task => task.status === 'FIRED').length

	return (
		<div className='flex items-center justify-between pt-10 md:justify-around'>
			<div className='text-completed flex flex-col items-center justify-center'>
				<span className='text-sm md:text-base'>Completed</span>
				<p className='text-5xl font-bold md:text-6xl' suppressHydrationWarning>
					{completed}
				</p>
			</div>
			<div className='text-secondary-foreground flex flex-col items-center justify-center md:text-base'>
				<span className='text-sm'>In progress</span>
				<p className='text-5xl font-bold md:text-6xl' suppressHydrationWarning>
					{inProgress}
				</p>
			</div>
			<div className='text-fired flex flex-col items-center justify-center md:text-base'>
				<span className='text-sm'>Fired</span>
				<p className='text-5xl font-bold md:text-6xl' suppressHydrationWarning>
					{fired}
				</p>
			</div>
		</div>
	)
}
