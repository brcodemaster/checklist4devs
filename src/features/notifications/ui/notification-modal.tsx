'use client'

import { Inbox } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/shared/lib'

import { Notification } from '@/generated/client'

export const Notifications: React.FC<{
	nots: Notification[]
	onClick: () => void
}> = ({ nots, onClick }) => {
	return (
		<div>
			<div className='border-b-muted-secondary border-b p-4'>
				<h2 className='text-lg'>Notifications</h2>
			</div>

			{nots.length > 0 ? (
				<ul className='bg-foreground flex h-[400px] flex-col gap-1 overflow-y-auto p-4'>
					{nots.map((not, idx) => (
						<li
							className='hover:bg-muted flex flex-col rounded-sm p-2 px-4'
							onClick={onClick}
							key={not.id + idx}
						>
							<Link href={`/notifications/${not.id}`}>
								<div
									className={cn(
										'text-md flex items-center gap-2 font-medium',
										not.state === 'NEW' ? 'text-white' : 'text-secondary'
									)}
								>
									<span
										className={cn(
											'text-lg',
											not.state === 'NEW'
												? 'text-white'
												: 'text-secondary-foreground'
										)}
									>
										#{idx + 1}
									</span>
									{not.title
										? not.title
										: 'Someone invited you to join the group'}
								</div>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<div className='bg-foreground text-secondary-foreground flex h-[400px] flex-col items-center justify-center gap-2 overflow-y-auto p-4'>
					<Inbox className='stroke-secondary-foreground size-10' /> Notifications not
					found
				</div>
			)}
		</div>
	)
}
