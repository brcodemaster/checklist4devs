'use client'

import { Eye, EyeOff } from 'lucide-react'
import { ComponentProps, useState } from 'react'

import { Input } from './input'

import { cn } from '../lib/utils'

function InputPassword({ className, ...props }: ComponentProps<'input'>) {
	const [isShow, setIsShow] = useState(false)

	return (
		<div className='relative'>
			<Input
				type={isShow ? 'text' : 'password'}
				{...props}
				className={cn('pr-10', className)}
			/>
			<div
				className='border-muted-secondary absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-md border p-1'
				onClick={() => setIsShow(!isShow)}
			>
				{isShow ? <Eye className='size-4' /> : <EyeOff className='size-4' />}
			</div>
		</div>
	)
}

export { InputPassword }
