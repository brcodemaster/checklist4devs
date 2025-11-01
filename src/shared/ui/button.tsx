import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer',
	{
		variants: {
			variant: {
				default:
					'bg-accent border border-accent-foreground text-primary-foreground hover:bg-[#287150] hover:border-[#3ecf8e]',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-muted border border-muted-secondary hover:border-white/30 hover:bg-card-hover',
				ghost: '',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md gap-1.5 px-3',
				lg: 'h-10 rounded-md px-6',
				icon: 'size-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	tooltipText,
	tooltipDelay,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
		tooltipText?: string
		tooltipDelay?: number
	}) {
	const Comp = asChild ? Slot : 'button'

	if (tooltipText) {
		return (
			<Tooltip delayDuration={tooltipDelay || 170}>
				<TooltipTrigger asChild>
					<Comp
						data-slot='button'
						className={cn(buttonVariants({ variant, size, className }))}
						{...props}
					/>
				</TooltipTrigger>
				<TooltipContent className='text-white'>
					<p>{tooltipText}</p>
				</TooltipContent>
			</Tooltip>
		)
	}

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
