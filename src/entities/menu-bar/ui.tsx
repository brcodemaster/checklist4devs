import { Menu } from 'lucide-react'
import Link from 'next/link'

import { mobileNavigation } from '@/shared/constants'
import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger
} from '@/shared/ui'

export const MenuBar: React.FC = () => {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					className='border-muted-secondary/60 group/menu border px-2'
					variant='secondary'
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
								className='hover:bg-muted-secondary group/item flex items-center gap-2 rounded-sm p-2'
							>
								<Icon className='text-secondary size-5 duration-200 group-hover/item:text-white' />{' '}
								<p className='text-secondary duration-200 group-hover/item:text-white'>
									{name}
								</p>
							</Link>
						</li>
					))}
				</ul>
				<DrawerDescription className='hidden' />
			</DrawerContent>
		</Drawer>
	)
}
