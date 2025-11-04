'use client'

import { LogOut } from 'lucide-react'

import { Button } from '@/shared/ui'

import { useLogoutButton } from './model'

export const LogoutButton: React.FC = () => {
	const { handleClick } = useLogoutButton()

	return (
		<Button
			variant='ghost'
			className='text-secondary hover:bg-secondary-foreground/30 group/item mt-1 flex h-7 w-full cursor-pointer items-center justify-between gap-1 rounded-sm px-2 py-1.5 text-xs'
			onClick={handleClick}
		>
			<span className='font-normal duration-100 group-hover/item:text-white'>Log out</span>
			<LogOut className='size-4 duration-100 group-hover/item:text-white' />
		</Button>
	)
}
