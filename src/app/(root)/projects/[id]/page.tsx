import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Bolt, Boxes, ChevronRight, LinkIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { ProjectStats } from '@/widgets/project-stats'
import { Tasks } from '@/widgets/tasks'

import { kyInstance } from '@/shared/api'
import { getProjectStatus } from '@/shared/lib'
import { TApiResponse } from '@/shared/types/default-types'
import { Badge, Button, Section } from '@/shared/ui'

import { Prisma } from '@/generated/client'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const cookieStore = (await cookies()).toString()

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['project', id],
		queryFn: async () => {
			const res = await kyInstance
				.get(`projects/${id}`, { headers: { cookie: cookieStore } })
				.json<
					TApiResponse<
						{ groupName: string; creatorName: string } & Prisma.ProjectGetPayload<{
							include: { tasks: true; group: { include: { developers: true } } }
						}>
					>
				>()

			return res.data
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

	const { icon: Icon, status } = getProjectStatus(project.status)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Section className='mt-10 flex grow flex-col'>
				<div className='flex items-center justify-between'>
					<h2 className='flex items-center justify-start gap-2 text-2xl text-white'>
						{project.name}
						<Badge
							variant='secondary'
							className='font-ibm bg-muted-secondary hidden text-center text-[10px] text-white md:flex'
						>
							<Boxes className='stroke-white' /> {project.group.name}
						</Badge>
						<Badge
							variant='secondary'
							className='font-ibm bg-muted-secondary hidden text-center text-[10px] text-white md:flex'
						>
							<Bolt className='stroke-white' /> {project.type.replaceAll('_', ' ')}
						</Badge>
						<Badge
							variant='secondary'
							className='font-ibm bg-muted-secondary hidden text-center text-[10px] text-white sm:flex'
						>
							<Icon className='stroke-white' /> {status.replaceAll('_', ' ')}
						</Badge>
						{project.links.map((link, idx) => {
							const url = new URL(link).hostname

							return (
								<Badge
									className='font-ibm bg-muted-secondary! group/link hidden w-8 justify-start gap-1 text-[10px] text-white hover:w-fit sm:flex'
									key={idx}
									variant='secondary'
									asChild
								>
									<Link href={link}>
										<LinkIcon className='shrink-0' />
										<span className='opacity-0 duration-200 group-hover/link:opacity-100'>
											{url}
										</span>
									</Link>
								</Badge>
							)
						})}
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

				<Tasks project={project} />
			</Section>
		</HydrationBoundary>
	)
}
