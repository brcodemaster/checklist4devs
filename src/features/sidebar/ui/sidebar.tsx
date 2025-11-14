'use client'

import { PanelLeftDashed } from 'lucide-react'
import Link from 'next/link'

import { sidebarNavigation } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import { useSidebar } from '../model'

export const Sidebar: React.FC = () => {
	const { isHoverEnabled, activePath, handleClick } = useSidebar()

	return (
		<aside className='border-r-muted-secondary bg-background absolute top-0 bottom-0 left-0 z-50 hidden border-r md:flex'>
			<nav
				className={cn(
					'group/aside flex w-[51px] flex-col items-start justify-between overflow-hidden px-1 py-2 duration-200',
					isHoverEnabled && 'hover:w-[200px]'
				)}
			>
				<ul className='flex h-full w-full flex-col items-start justify-start space-y-1'>
					{sidebarNavigation.map(({ icon: Icon, link, name }, idx) => (
						<li key={name + idx} className='group/item flex w-full justify-start'>
							<Link
								href={link}
								className={cn(
									'hover:bg-muted-secondary flex w-full items-center justify-start gap-2 rounded-sm px-3 py-2 duration-200',
									activePath === link && 'bg-muted-secondary'
								)}
							>
								<Icon
									className={cn(
										'stroke-secondary-foreground size-4.5 shrink-0 duration-200 group-hover/item:stroke-white',
										activePath === link && 'stroke-white'
									)}
								/>

								<span
									className={cn(
										'text-secondary-foreground invisible text-base opacity-0 duration-200 group-hover/aside:visible group-hover/aside:opacity-100 group-hover/item:text-white',
										isHoverEnabled &&
											'visible opacity-100 not-group-hover/aside:invisible not-group-hover/aside:opacity-0',
										activePath === link && 'text-white',
										!isHoverEnabled &&
											'group-hover/aside:invisible group-hover/aside:opacity-0'
									)}
								>
									{name}
								</span>
							</Link>
						</li>
					))}
					<li className='flex w-full shrink-0 grow items-end justify-start'>
						<Button
							className={cn(
								'hover:bg-muted-secondary group/item flex w-full shrink-0 items-center justify-start gap-2 rounded-sm px-3 py-2 duration-200'
							)}
							onClick={handleClick}
							variant='ghost'
						>
							<PanelLeftDashed className='stroke-secondary-foreground size-4.5 shrink-0 duration-200 group-hover/item:stroke-white' />

							<span
								className={cn(
									'text-secondary-foreground invisible text-sm font-normal opacity-0 duration-200 group-hover/aside:visible group-hover/aside:opacity-100 group-hover/item:text-white',
									isHoverEnabled &&
										'visible opacity-100 not-group-hover/aside:invisible not-group-hover/aside:opacity-0',
									!isHoverEnabled &&
										'group-hover/aside:invisible group-hover/aside:opacity-0'
								)}
							>
								Collapse sidebar
							</span>
						</Button>
					</li>
				</ul>
			</nav>
		</aside>
	)
}
