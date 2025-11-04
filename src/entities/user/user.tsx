'use client'

import Link from 'next/link'

import { LogoutButton } from '@/features/logout-button'

import { userNavigation } from '@/shared/constants'
import { useAuth } from '@/shared/contexts/auth-context'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/ui'

export const UserButton: React.FC = () => {
	const { user } = useAuth()

	return (
		<Popover>
			<PopoverTrigger>
				<Avatar className='size-7 cursor-pointer'>
					<AvatarImage src='/user.png' className='' />
					<AvatarFallback>CH</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className='p-2' align='end'>
				<div className='text-secondary flex flex-col items-start px-2 py-1.5 text-xs'>
					<h3 className='text-sm text-white'>{user?.userName}</h3>
					<span>{user?.email}</span>
				</div>
				<ul className='border-muted-secondary my-1 border-y py-1'>
					{userNavigation.map(({ icon: Icon, link, name }, idx) => (
						<li key={name + idx}>
							<Link
								href={link}
								className='hover:bg-secondary-foreground/30 group/item flex items-center gap-1 rounded-sm px-2 py-1.5 text-xs'
							>
								<Icon className='stroke-secondary size-3.5 duration-200 group-hover/item:stroke-white' />
								<span className='text-secondary duration-200 group-hover/item:text-white'>
									{name}
								</span>
							</Link>
						</li>
					))}
				</ul>
				<LogoutButton />
			</PopoverContent>
		</Popover>
	)
}
