import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'
import { Badge, Section } from '@/shared/ui'

import { Prisma } from '@/generated/client'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['project', id],
		queryFn: async () => {
			const res = await kyInstance.get(`projects/${id}`).json<
				TApiResponse<
					Prisma.ProjectGetPayload<{
						include: { tasks: true; group: { include: { developers: true } } }
					}>
				>
			>()

			const data = res.data

			return data
		}
	})

	const project = queryClient.getQueryData<
		Prisma.ProjectGetPayload<{
			include: { tasks: true; group: { include: { developers: true } } }
		}>
	>(['project', id])

	if (!project)
		return (
			<Section className='text-secondary mt-10 flex grow flex-col items-center justify-center overflow-hidden text-xl'>
				Project with this ID: #{id} is not found <br />
				{/* <BackButton className='mt-10' /> */}
			</Section>
		)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Section className='flex h-full flex-col pt-10'>
				<div className='flex items-center justify-between'>
					<h2 className='flex items-center gap-2 text-2xl text-white'>
						{project.name}
						<Badge
							variant='secondary'
							className='font-ibm bg-muted-secondary text-[10px] text-white'
						>
							{project.type}
						</Badge>
					</h2>

					{/* <SettingsButton id={id} /> */}
				</div>

				{/* <ProjectStats projectId={id} /> */}

				<div className='flex items-center justify-between gap-2 pt-8'>
					{/* <SearchInput placeholder='Filter tasks' parentClassName='w-full lg:w-fit' /> */}

					{/* <CreateTaskDialog users={project.group.developers} /> */}
				</div>

				{/* <TaskList usersMap={project.usersMap} users={project.group.developers} /> */}
			</Section>
		</HydrationBoundary>
	)
}
