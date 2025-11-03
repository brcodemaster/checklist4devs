import { CircleQuestionMark } from 'lucide-react'
import Link from 'next/link'

import { FeedbackButton } from '@/features/feedback'
import { NotificationButton } from '@/features/notifications'
import { SearchButton } from '@/features/search'

import { ActivePath } from '@/entities/active-path'
import { MenuBar } from '@/entities/menu-bar'
import { UserButton } from '@/entities/user'

import { Button, Logo, Section } from '@/shared/ui'

export const MobileHeader: React.FC = () => {
	return (
		<>
			<Section className='border-b-muted-secondary/80 flex items-center justify-between border-b py-2.5 md:hidden'>
				<Logo width={28} height={27} />

				<div className='flex items-center gap-1'>
					<SearchButton />

					<MenuBar />
				</div>
			</Section>
			<header className='bg-background z-50 block md:hidden'>
				<Section className='border-b-muted-secondary/80 flex items-center justify-between border-b py-2'>
					<ActivePath />

					<div className='flex items-center gap-2'>
						<FeedbackButton />

						<div className='border-muted-secondary flex h-8 items-center gap-0 overflow-hidden rounded-full border'>
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
				</Section>
			</header>
		</>
	)
}
