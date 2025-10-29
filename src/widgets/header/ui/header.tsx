import Image from 'next/image'

import { FeedbackButton } from '@/features/feedback'

import { ActivePath } from '@/entities/active-path'

import { cn } from '@/shared/lib/utils'

type Props = {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header
			className={cn(
				'border-b-muted-secondary flex h-12 items-center justify-between border-b px-4',
				className
			)}
		>
			<div className='flex items-center gap-2'>
				<Image src='/logo.webp' alt='Checklist4Devs' width={24} height={24} />
				<ActivePath />
			</div>
			<div>
				<FeedbackButton />
			</div>
		</header>
	)
}
