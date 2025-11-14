import Image, { ImageProps } from 'next/image'
import Link from 'next/link'

import { ActivePath } from '@/entities/active-path'

export const Logo: React.FC<{ hasActivePath?: boolean } & Omit<ImageProps, 'src' | 'alt'>> = ({
	hasActivePath = false,
	...props
}) => {
	return (
		<div className='flex items-center gap-2'>
			<Link href='/'>
				<Image src='/logo.webp' alt='Checklist4Devs' width={24} height={23} {...props} />
			</Link>
			{hasActivePath && <ActivePath />}
		</div>
	)
}
