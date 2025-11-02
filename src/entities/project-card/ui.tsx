import { Bolt, Boxes, ChevronRight, UserPen } from 'lucide-react'
import Link from 'next/link'

import { getProjectStatus } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'

import { Project } from '@/generated/client'

type Props = {
	project: Project & { creatorName: string; groupName: string }
	type: string
}

export const ProjectCard: React.FC<Props> = ({ project, type }) => {
	const { icon: Icon, status, text } = getProjectStatus(project.status)

	return (
		<Link
			href={`/projects/${project.id}`}
			className='bg-card hover:bg-card-hover group relative flex h-44 flex-col justify-between overflow-hidden rounded-md border border-white/10 p-5'
		>
			<div className='relative flex items-start justify-between'>
				<div className='flex flex-col gap-1'>
					<h3 className='text-base font-medium'>{project.name}</h3>
					<p className='text-secondary-foreground flex flex-col items-start gap-1 text-xs'>
						<span className='flex items-center gap-1'>
							<Bolt className='size-3' />
							<span className='first-letter:uppercase'>
								{type.replaceAll('_', ' ')}
							</span>
						</span>
						<span className='flex items-center gap-1'>
							<UserPen className='size-3' /> {project.creatorName}
						</span>
						<span className='flex items-center gap-1'>
							<Boxes className='size-3' /> {project.groupName}
						</span>
					</p>
				</div>
				<ChevronRight className='stroke-secondary-foreground absolute top-1 right-1 size-5 duration-300 group-hover:right-0 group-hover:stroke-white' />
			</div>
			<div className='flex'>
				<div className='flex items-center gap-2 text-xs'>
					<div className='rounded-md border border-white/10 p-2'>
						<Icon
							className={cn(
								'size-3 stroke-white',
								status === 'PAUSED' && 'fill-white'
							)}
						/>
					</div>
					{text}
				</div>
			</div>
			<span className='absolute bottom-8 left-1/2 -translate-x-4/6 -translate-y-1/2 font-sans! text-[200px] leading-0 font-black whitespace-nowrap opacity-1'>
				{project.name}
			</span>
		</Link>
	)
}
