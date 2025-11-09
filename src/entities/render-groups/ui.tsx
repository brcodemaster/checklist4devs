import { Skeleton } from '@/shared/ui'

import { Prisma } from '@/generated/client'

import { GroupCard } from '../group-card'

type Props = {
	groups: (Prisma.GroupGetPayload<{ include: { projects: true } }> & { creatorName: string })[]
	isLoading: boolean
}

export const RenderGroups: React.FC<Props> = ({ groups, isLoading }) => {
	if (!isLoading && groups.length === 0)
		return (
			<div className='text-secondary-foreground flex min-h-36 grow flex-col items-center justify-center text-base'>
				Groups not found
			</div>
		)

	return (
		<div className='flex flex-col gap-2 pt-4 md:grid md:grid-cols-2 lg:grid-cols-3'>
			{isLoading
				? Array.from({ length: 6 }, (_, idx) => <Skeleton key={idx} className='h-[70px]' />)
				: groups.map((group, idx) => <GroupCard group={group} key={group.id + idx} />)}
		</div>
	)
}
