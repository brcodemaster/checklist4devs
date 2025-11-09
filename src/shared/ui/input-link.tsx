// InputLink.tsx
'use client'

import { ComponentProps, useState } from 'react'

import { Button, Input } from '@/shared/ui'

import { cn } from '../lib'

// InputLink.tsx

// InputLink.tsx

// InputLink.tsx

// InputLink.tsx

// InputLink.tsx

// InputLink.tsx

// InputLink.tsx

type Props = {
	handleClick: (value: string) => void
	className?: string
	placeholder?: string
	icon: React.ComponentType<{ className?: string }>
} & ComponentProps<'input'>

export function InputLink({ handleClick, className, placeholder, icon: Icon, ...props }: Props) {
	const [inputValue, setInputValue] = useState('')

	return (
		<div className='group/input relative'>
			<Input
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				placeholder={placeholder}
				className={cn('bg-neutral-800', className)}
				{...props}
			/>
			<Button
				type='button'
				className='border-muted-secondary absolute top-1/2 right-2 size-6 -translate-y-1/2 cursor-pointer rounded-sm border p-1 opacity-0 duration-200 group-hover/input:opacity-100'
				onClick={() => {
					handleClick(inputValue)
					setInputValue('')
				}}
				variant='ghost'
				size='icon'
			>
				<Icon className='size-4' />
			</Button>
		</div>
	)
}
