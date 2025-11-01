import { CircleQuestionMark } from 'lucide-react'
import Link from 'next/link'

import { FeedbackButton } from '@/features/feedback'
import { NotificationButton } from '@/features/notifications'

import { UserButton } from '@/entities/user'

import { cn } from '@/shared/lib/utils'
import { Button, Logo } from '@/shared/ui'

type Props = {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header
			className={cn(
				'border-b-muted-secondary hidden h-12 items-center justify-between border-b px-4 md:flex',
				className
			)}
		>
			<Logo hasActivePath />
			<div className='flex items-center gap-2'>
				<FeedbackButton />
				<div className='border-muted-secondary bg-background flex h-8 items-center gap-0 overflow-hidden rounded-full border'>
					<Link href='/help'>
						<Button
							variant='ghost'
							tooltipText='Help'
							className='hover:bg-muted group/question group/question flex w-full items-center justify-center rounded-r-none pr-2 pl-3'
						>
							<CircleQuestionMark className='stroke-secondary-foreground size-4 group-hover/question:stroke-white' />
						</Button>
					</Link>
					<NotificationButton />
				</div>
				<UserButton />
			</div>
		</header>
	)
}
