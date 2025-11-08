'use client'

import { Inbox } from 'lucide-react'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'

import { Notifications } from './notification-modal'

import { useNotifications } from '../model'

export const NotificationButton: React.FC = () => {
	const notifications = useNotifications()

	return (
		<Popover
			open={notifications.isOpen}
			onOpenChange={() => notifications.onOpenChange(!notifications.isOpen)}
		>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					className='hover:bg-muted group/box relative flex w-full items-center justify-center rounded-l-none pr-3 pl-2'
					onClick={() => notifications.onOpenChange(true)}
				>
					<Inbox className='stroke-secondary-foreground size-4 group-hover/box:stroke-white' />
					{notifications.newNots > 0 && (
						<span className='absolute top-2 right-[11px] z-20 size-2 rounded-full bg-blue-500' />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent align='end' className='overflow-hidden p-0 md:min-w-[500px]'>
				<Notifications
					nots={notifications.nots}
					onClick={() => notifications.onOpenChange(false)}
				/>
			</PopoverContent>
		</Popover>
	)
}
