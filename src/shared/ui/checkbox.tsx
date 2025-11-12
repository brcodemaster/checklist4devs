'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon, X } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

import { TaskStatus } from '../types/default-types'

function Checkbox({
	className,
	status,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { status: TaskStatus }) {
	return (
		<CheckboxPrimitive.Root
			data-slot='checkbox'
			className={cn(
				'peer dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className,
				status === 'FIRED'
					? 'border-red-900'
					: status === 'COMPLETED'
						? 'border-accent'
						: 'border-secondary-foreground'
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot='checkbox-indicator'
				className={cn(
					'flex items-center justify-center text-current transition-none',
					status === 'FIRED'
						? 'border-red-900'
						: status === 'COMPLETED'
							? 'border-accent'
							: 'border-white'
				)}
			>
				{status !== 'FIRED' ? (
					<CheckIcon
						className={cn(
							'size-3.5',
							status === 'COMPLETED' ? 'stroke-accent' : 'stroke-white'
						)}
						suppressHydrationWarning
					/>
				) : (
					<X className='size-3.5 stroke-red-900' suppressHydrationWarning />
				)}
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
