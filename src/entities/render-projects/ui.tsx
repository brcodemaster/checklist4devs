import { Skeleton } from '@/shared/ui'

import { Project } from '@/generated/client'

import { ProjectCard } from '../project-card/ui'

type Props = {
	projects: (Project & { creatorName: string; groupName: string })[]
	isLoading: boolean
}

export const RenderProjects: React.FC<Props> = ({ projects, isLoading }) => {
	if (!isLoading && projects.length === 0)
		return (
			<div className='text-secondary-foreground flex min-h-36 grow flex-col items-center justify-center text-base'>
				Projects not found
			</div>
		)

	return (
		<div className='flex flex-col gap-2 pt-4 md:grid md:grid-cols-2 lg:grid-cols-3'>
			{isLoading
				? Array.from({ length: 6 }, (_, idx) => <Skeleton key={idx} className='h-44' />)
				: projects.map(project => <ProjectCard project={project} key={project.id} />)}
		</div>
	)
}
