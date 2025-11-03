'use client'

import { Github } from 'lucide-react'

import { Button } from '@/shared/ui'

import { RegisterForm } from './register-form'

export const Register: React.FC = () => {
	return (
		<div className='flex flex-col gap-4 pt-4'>
			<div className='border-muted-secondary hover:bg-input pointer-events-none rounded-lg border p-0.5 opacity-40 duration-200 hover:border-white/30'>
				<Button variant='secondary' className='text-md w-full py-5'>
					<Github className='stroke-secondary-foreground size-5' /> Continue with GitHub
				</Button>
			</div>

			<div className='flex items-center gap-2'>
				<span className='border-t-muted-secondary w-full border-t' />
				<span>or</span>
				<span className='border-t-muted-secondary w-full border-t' />
			</div>

			<RegisterForm />
		</div>
	)
}
