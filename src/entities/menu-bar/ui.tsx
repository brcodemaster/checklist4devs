'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'

import { mobileNavigation } from '@/shared/constants'
import { cn } from '@/shared/lib'
import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger
} from '@/shared/ui'

import { useMenuBar } from './model'

export const MenuBar: React.FC = () => {
	const { handleOpen, isOpen, activePath } = useMenuBar()

	return (
		<Drawer open={isOpen} onOpenChange={() => handleOpen(!isOpen)}>
			<DrawerTrigger asChild>
				<Button
					className='border-muted-secondary/60 group/menu border px-2'
					variant='secondary'
					onClick={() => handleOpen(true)}
				>
					<Menu className='size-4.5 stroke-white' />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerTitle className='h-4'></DrawerTitle>
				<ul className='flex flex-col gap-1 p-2'>
					{mobileNavigation.map(({ icon: Icon, link, name }, idx) => (
						<li key={idx}>
							<Link
								href={link}
								className={cn(
									'hover:bg-muted-secondary group/item text-secondary stroke-secondary flex items-center gap-2 rounded-sm p-2 duration-200 hover:stroke-white hover:text-white',
									activePath === link && 'bg-muted-secondary text-white'
								)}
								onClick={() => handleOpen(false)}
							>
								<Icon className='size-5 duration-200' /> <p>{name}</p>
							</Link>
						</li>
					))}
				</ul>
				<DrawerDescription className='hidden' />
			</DrawerContent>
		</Drawer>
	)
}
