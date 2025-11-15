import Link from 'next/link'

import { Login } from '@/features/login'

export default function Page() {
	return (
		<div className='border-r-muted-secondary bg-background flex h-full flex-col items-center border-r p-8 xl:w-[560px]'>
			<div className='flex max-w-[560px] grow flex-col items-start py-8 lg:p-10'>
				<div>
					<h3 className='text-3xl'>Welcome back</h3>
					<p className='text-secondary pt-2 text-sm font-medium'>
						Sign in to your account{' '}
					</p>
				</div>

				<div className='w-full py-5'>
					<Login />
				</div>

				<div className='text-secondary self-center text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/auth/register' className='text-white underline hover:no-underline'>
						Sign Up Now
					</Link>
				</div>

				<p className='text-secondary mt-auto text-center align-bottom text-xs'>
					By continuing, you agree to checklist4devs Terms of Service and Privacy Policy,
					and to receive periodic emails with updates.
				</p>
			</div>
		</div>
	)
}
