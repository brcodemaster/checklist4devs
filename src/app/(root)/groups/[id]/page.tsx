import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { Table } from '@/widgets/table'

import { TTableUser } from '@/features/data-table'

import { RenderProjects } from '@/entities/render-projects'

import { groupService } from '@/shared/lib/services/group-service'
import { userService } from '@/shared/lib/services/user-service'
import { Section } from '@/shared/ui'

import { Prisma } from '@/generated/client'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['group', id],
		queryFn: async () =>
			await groupService.findById(id, {
				include: {
					projects: true,
					developers: true
				}
			})
	})

	const group = queryClient.getQueryData<
		Prisma.GroupGetPayload<{ include: { developers: true; projects: true } }>
	>(['group', id])

	if (!group)
		return (
			<Section className='text-secondary mt-10 flex grow flex-col items-center justify-center overflow-hidden text-xl'>
				Group with this ID: #{id} is not found
			</Section>
		)

	const creatorIds = group.projects.map(project => project.creatorId)

	const creators = await userService.findAll({
		where: {
			id: {
				in: creatorIds
			}
		},
		select: {
			id: true,
			userName: true
		}
	})

	const creatorsObject = Object.fromEntries(
		creators.map(creator => [creator.id, creator.userName])
	)

	const adminIds = new Set(group.admins)

	const metaDevelopers = group.developers.map(developer => {
		return {
			id: developer.id,
			userName: developer.userName,
			joinedAt: new Date(),
			role: adminIds.has(developer.id) ? 'ADMIN' : 'REGULAR'
		} as TTableUser
	})

	const metaProjects = group.projects.map(project => ({
		...project,
		creatorName: creatorsObject[project.creatorId],
		groupName: group.name,
		groupId: group.id
	}))

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Section className='mt-10'>
				<div className='flex h-9 items-center justify-between'>
					<h2 className='text-secondary text-lg'>
						Group <span className='text-2xl font-medium text-white'>{group.name}</span>
					</h2>
				</div>

				<div className='py-6'>
					<Table
						creatorIds={group.admins}
						developers={metaDevelopers}
						creatorId={group.creatorId}
					/>
				</div>

				<div>
					<h3 className='text-secondary text-lg'>Projects</h3>

					<RenderProjects isLoading={false} projects={metaProjects} />
				</div>
			</Section>
		</HydrationBoundary>
	)
}
