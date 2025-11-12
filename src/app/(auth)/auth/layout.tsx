import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui'

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='bg-foreground flex h-full'>
			<div className='h-full w-full shrink-0 xl:w-fit'>{children}</div>
			<div className='hidden size-full items-center justify-center xl:flex'>
				<div className='relative flex flex-col items-center justify-center'>
					<span className='text-muted-secondary absolute top-10 -left-8 font-sans text-[160px] leading-0'>
						“
					</span>
					<p className='z-10 max-w-lg text-3xl font-normal text-balance'>
						Checklist4Devs has become the silent partner of modern dev teams — ensuring
						every release feels effortless
					</p>

					<div className='flex items-center gap-2 self-start pt-10'>
						<Avatar className='size-10'>
							<AvatarFallback>D</AvatarFallback>
							<AvatarImage
								src='/creator.webp'
								className='size-full overflow-hidden object-cover object-top'
							/>
						</Avatar>
						<p className='text-sm font-medium text-white'>
							Developer of checklist4devs
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
