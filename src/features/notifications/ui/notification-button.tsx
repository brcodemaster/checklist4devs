'use client'

import { Inbox } from 'lucide-react'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'

import { Notifications } from './notification-modal'

import { useNotifications } from '../model'

export const NotificationButton: React.FC = () => {
	const notifications = useNotifications()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					className='hover:bg-muted group/box flex w-full items-center justify-center rounded-l-none pr-3 pl-2'
				>
					<Inbox className='stroke-secondary-foreground size-4 group-hover/box:stroke-white' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align='end'
				className='overflow-y-auto md:max-h-[400px] md:min-w-[500px]'
			>
				<Notifications hook={notifications} />
			</PopoverContent>
		</Popover>
	)
}
