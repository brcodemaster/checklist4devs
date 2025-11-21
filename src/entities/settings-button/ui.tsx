'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/shared/ui'

import { useSettingsButton } from './model'

export const SettingsButton: React.FC = () => {
	const { isInGroup, id } = useSettingsButton()

	console.log(isInGroup)

	if (isInGroup)
		return (
			<Button variant='ghost' className='group/settings h-[38px]' asChild>
				<Link
					href={`${id}/settings`}
					className='border-muted-secondary w-fit items-center gap-1 border hover:border-white/30'
				>
					<p className='text-secondary-foreground flex items-center text-sm font-extralight duration-200 group-hover/settings:text-white'>
						Settings
					</p>
					<ChevronRight className='stroke-secondary-foreground size-4 shrink-0 duration-200 group-hover/settings:stroke-white' />
				</Link>
			</Button>
		)
}
