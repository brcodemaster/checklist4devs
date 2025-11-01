'use client'

import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { navigation } from '@/shared/constants'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/ui'

export const UserButton: React.FC<{ onClick?: VoidFunction }> = ({ onClick }) => {
	return (
		<Popover>
			<PopoverTrigger>
				<Avatar className='size-7 cursor-pointer'>
					<AvatarImage src='/user.png' className='' />
					<AvatarFallback>RB</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className='p-2'>
				<div className='text-secondary flex flex-col items-start gap-1 px-2 py-1.5 text-xs'>
					<h3 className='text-sm text-white'>brcodemaster</h3>
					<span>b.ravshanbekov@mail.ru</span>
				</div>
				<ul className='border-muted-secondary border-y py-1'>
					{navigation.map(({ icon: Icon, link, name }, idx) => (
						<li key={name + idx}>
							<Link
								href={link}
								className='text-secondary hover:bg-secondary-foreground/30 group/item flex items-center gap-1 rounded-sm px-2 py-1.5 text-xs'
							>
								<Icon className='stroke-secondary-foreground size-3.5 duration-200 group-hover/item:stroke-white' />
								<span className='duration-200 group-hover/item:text-white'>
									{name}
								</span>
							</Link>
						</li>
					))}
				</ul>
				<Button
					variant='ghost'
					className='text-secondary hover:bg-secondary-foreground/30 group/item mt-1 flex h-7 w-full cursor-pointer items-center justify-between gap-1 rounded-sm px-2 py-1.5 text-xs'
					onClick={onClick}
				>
					<span className='font-normal duration-100 group-hover/item:text-white'>
						Log out
					</span>
					<LogOut className='size-4 duration-100 group-hover/item:text-white' />
				</Button>
			</PopoverContent>
		</Popover>
	)
}
