import { Prisma } from '__generated__/browser'
import { Boxes } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/shared/lib/utils'

type Props = {
	group: Prisma.GroupGetPayload<{ include: { projects: true } }> & { creatorName: string }
	className?: string
}

export const GroupCard: React.FC<Props> = ({ group, className }) => {
	return (
		<Link
			href={`/groups/${group.id}`}
			className={cn(
				'bg-card hover:bg-card-hover flex h-[70px] w-full items-center justify-between gap-3 rounded-md border border-white/10 p-3',
				className
			)}
		>
			<div className='flex items-center gap-3'>
				<div className='ml-0.5 flex h-8 w-8 items-center justify-center rounded-full'>
					<Boxes className='size-6 stroke-1' />
				</div>
				<div>
					<h3 className='text-sm font-medium'>{group.name}</h3>
					<div className='text-secondary-foreground flex items-center gap-1.5 text-xs'>
						<p>{group.creatorName}</p>
						<div className='bg-secondary-foreground h-1.5 w-1.5 rounded-full' />
						<p>{group.projects?.length || 0} project</p>
					</div>
				</div>
			</div>
		</Link>
	)
}
