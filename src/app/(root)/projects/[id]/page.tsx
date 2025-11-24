import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Bolt, Boxes, ChevronRight, Github, LinkIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { ProjectStats } from '@/widgets/project-stats'
import { Tasks } from '@/widgets/tasks'

import { kyInstance } from '@/shared/api'
import { getProjectStatus } from '@/shared/lib'
import { TApiResponse } from '@/shared/types/default-types'
import { Badge, Button, Section } from '@/shared/ui'

import { Prisma, User } from '@/generated/client'

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
							include: {
								tasks: true
								group: { include: { developers: { include: { user: true } } } }
							}
						}>
					>
				>()

			return res.data
		}
	})

	const { id: userId } = await kyInstance
		.get('auth/me', { headers: { cookie: cookieStore } })
		.json<User>()

	const project = queryClient.getQueryData<
		Prisma.ProjectGetPayload<{
			include: {
				tasks: { orderBy: { index: 'desc' } }
				group: { include: { developers: { include: { user: true } } } }
			}
		}>
	>(['project', id])

	if (!project)
		return (
			<Section className='text-secondary mt-10 flex grow flex-col items-center justify-center overflow-hidden text-xl'>
				Project with this ID: #{id} is not found <br />
			</Section>
		)

	const developers = project.group.developers.map(developer => developer.user)

	const isInGroup = developers.some(developer => developer.id === userId)

	const { icon: Icon, status } = getProjectStatus(project.status)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Section className='mt-10 flex grow flex-col'>
				<div className='flex items-center justify-between gap-2'>
					<div className='invisible-scroll relative flex w-full items-center gap-1 overflow-hidden'>
						<h2 className='flex items-center justify-start gap-2 text-2xl whitespace-nowrap text-white'>
							{project.name}
						</h2>
						<div className='invisible-scroll relative flex w-full items-center gap-1 overflow-x-auto pl-2'>
							<Badge
								variant='secondary'
								className='font-ibm bg-muted-secondary flex text-center text-[10px] text-white'
							>
								<Boxes className='stroke-white' /> {project.group.name}
							</Badge>
							<Badge
								variant='secondary'
								className='font-ibm bg-muted-secondary flex text-center text-[10px] text-white'
							>
								<Bolt className='stroke-white' />{' '}
								{project.type.replaceAll('_', ' ')}
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
										className='font-ibm bg-muted-secondary! flex justify-start gap-1 text-[10px] text-white'
										key={idx}
										variant='secondary'
										asChild
									>
										<Link href={link}>
											{url === 'github.com' ? (
												<Github className='shrink-0' />
											) : (
												<LinkIcon className='shrink-0' />
											)}
											<span>{url}</span>
										</Link>
									</Badge>
								)
							})}
						</div>
						<div className='from-background absolute top-1/2 -right-0.5 z-0 h-full w-9 -translate-y-1/2 bg-linear-to-l to-transparent' />
					</div>

					{isInGroup && (
						<Button
							variant='ghost'
							className='group/settings relative z-1 h-[38px] shrink-0'
							asChild
						>
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
					)}
				</div>

				<ProjectStats projectId={id} />

				<Tasks project={project} />
			</Section>
		</HydrationBoundary>
	)
}
