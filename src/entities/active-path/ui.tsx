'use client'

import Link from 'next/link'

import { useActivePath } from './model'

export const ActivePath: React.FC = () => {
	const { activePath, link } = useActivePath()

	return (
		<div className='flex items-center gap-1'>
			<span className='text-secondary-foreground'>/</span>
			<Link href={link}>{activePath}</Link>
		</div>
	)
}
