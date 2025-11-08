import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { ProjectStats } from '@/widgets/project-stats'
import { Tasks } from '@/widgets/tasks'

import { groupService } from '@/shared/lib/services/group-service'
import { projectService } from '@/shared/lib/services/project-service'
import { userService } from '@/shared/lib/services/user-service'
import { Badge, Button, Section } from '@/shared/ui'

import { Prisma } from '@/generated/client'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['project', id],
		queryFn: async () => {
			const project = await projectService.findById(id, {
				include: {
					tasks: { orderBy: { index: 'desc' } },
					group: { include: { developers: true } }
				}
			})

			const { userName: creatorName } = await userService.findById(project.creatorId, {
				select: { userName: true }
			})

			const { name: groupName } = await groupService.findById(project.groupId, {
				select: { name: true }
			})

			const metaProject = {
				...project,
				creatorName,
				groupName
			}

			return metaProject
		}
	})

	const project = queryClient.getQueryData<
		Prisma.ProjectGetPayload<{
			include: {
				tasks: { orderBy: { index: 'desc' } }
				group: { include: { developers: true } }
			}
		}>
	>(['project', id])

	if (!project)
		return (
			<Section className='text-secondary mt-10 flex grow flex-col items-center justify-center overflow-hidden text-xl'>
				Project with this ID: #{id} is not found <br />
			</Section>
		)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Section className='mt-10 flex h-full flex-col'>
				<div className='flex items-center justify-between'>
					<h2 className='flex items-center gap-2 text-2xl text-white'>
						{project.name}
						<Badge
							variant='secondary'
							className='font-ibm bg-muted-secondary text-center text-[10px] text-white'
						>
							{project.type.replaceAll('_', ' ')}
						</Badge>
					</h2>

					<Button variant='ghost' className='group/settings h-[38px]' asChild>
						<Link
							href={`${id}/settings`}
							className='border-muted-secondary w-fit items-center gap-1 border hover:border-white/30'
						>
							<p className='text-secondary-foreground flex items-center text-sm font-extralight duration-200 group-hover/settings:text-white'>
								Settings
							</p>
							<ChevronRight className='stroke-secondary-foreground size-4 shrink-0 duration-200 group-hover/settings:stroke-white' />
						</Link>
					</Button>
				</div>

				<ProjectStats projectId={id} />

				<Tasks project={project} users={project.group.developers} />
			</Section>
		</HydrationBoundary>
	)
}
