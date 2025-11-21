import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { cookies } from 'next/headers'

import { Table } from '@/widgets/table'

import { TTableUser } from '@/features/data-table'

import { RenderProjects } from '@/entities/render-projects'

import { kyInstance } from '@/shared/api'
import { userService } from '@/shared/lib/services/user-service'
import { TApiResponse } from '@/shared/types/default-types'
import { Section } from '@/shared/ui'

import { Prisma } from '@/generated/client'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const cookieStore = (await cookies()).toString()

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['group', id],
		queryFn: async () => {
			const res = await kyInstance
				.get(`groups/${id}`, {
					headers: {
						cookie: cookieStore
					}
				})
				.json<
					TApiResponse<
						Prisma.GroupGetPayload<{ include: { projects: true; developers: true } }>
					>
				>()

			return res.data
		}
	})

	const group = queryClient.getQueryData<
		Prisma.GroupGetPayload<{
			include: { developers: { include: { user: true } }; projects: true }
		}>
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
			id: developer.user.id,
			userName: developer.user.userName,
			joinedAt: new Date(developer.joinedAt),
			role: adminIds.has(developer.user.id) ? 'ADMIN' : 'REGULAR'
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
			<Section className='mt-10 flex grow flex-col'>
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

				<h3 className='text-secondary text-lg'>Projects</h3>

				<RenderProjects isLoading={false} projects={metaProjects} />
			</Section>
		</HydrationBoundary>
	)
}
