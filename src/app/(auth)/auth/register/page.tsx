import Link from 'next/link'

import { Register } from '@/features/register'

export default function Page() {
	return (
		<div className='border-r-muted-secondary bg-background flex h-full w-full flex-col items-center border-r p-8 xl:max-w-[560px]'>
			<div className='flex max-w-[560px] flex-col items-start py-8 lg:p-10'>
				<div>
					<h3 className='text-3xl'>Get started</h3>
					<p className='text-secondary pt-2 text-sm font-medium'>Create a new account</p>
				</div>

				<div className='w-full py-5'>
					<Register />
				</div>

				<div className='text-secondary self-center text-center text-sm'>
					Have an account?{' '}
					<Link href='/auth/login' className='text-white underline hover:no-underline'>
						Sign In Now
					</Link>
					<p className='text-secondary pt-10 text-xs'>
						By continuing, you agree to checklist4devs Terms of Service and Privacy
						Policy, and to receive periodic emails with updates.
					</p>
				</div>
			</div>
		</div>
	)
}
