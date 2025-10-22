import { PropsWithChildren } from 'react'

import { cn } from '../lib/utils'

type Props = {
	className?: string
}

export const Section: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
	return (
		<section className={cn('container mx-auto w-full max-w-[1440px] px-4', className)}>
			{children}
		</section>
	)
}
