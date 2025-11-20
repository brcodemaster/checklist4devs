import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { AccessToGroupButton } from '@/features/access-to-group-button'

import { Button, Section } from '@/shared/ui'

import { prisma } from '@/prisma-client'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const notification = await prisma.notification.findUnique({
		where: {
			id
		}
	})

	if (!notification)
		return (
			<Section className='text-secondary mt-10 flex grow flex-col items-center justify-center overflow-hidden text-xl'>
				Notification with this ID: #{id} is not found
			</Section>
		)

	await prisma.notification.update({
		where: {
			id
		},
		data: {
			state: 'OPENED'
		}
	})

	if (notification.title === 'Invitation')
		return (
			<Section className='mt-10'>
				<div>
					<div className='flex items-center gap-4'>
						<Button variant='ghost' className='group/settings' asChild>
							<Link
								href={`/`}
								className='border-muted-secondary w-fit items-center gap-1 border hover:border-white/30'
							>
								<ChevronLeft className='stroke-secondary-foreground size-4 shrink-0 duration-200 group-hover/settings:stroke-white' />
								<p className='text-secondary-foreground flex items-center text-sm font-extralight duration-200 group-hover/settings:text-white'>
									back to home
								</p>
							</Link>
						</Button>

						<h3 className='w-full text-center text-2xl text-white'>
							{notification.title}
						</h3>
					</div>
					<p className='text-secondary pt-8 text-lg'>{notification.description}</p>
					{notification.state === 'NEW' && (
						<div className='flex w-full items-center justify-between gap-2 pt-5'>
							<Button variant='secondary' asChild>
								<Link href='/'>Dismiss</Link>
							</Button>

							<AccessToGroupButton groupId={notification.invitedGroupId} />
						</div>
					)}
				</div>
			</Section>
		)

	return (
		<Section className='mt-10 flex grow flex-col overflow-hidden'>
			<div>
				<div className='flex items-center gap-4'>
					<Button variant='ghost' className='group/settings' asChild>
						<Link
							href={`/`}
							className='border-muted-secondary w-fit items-center gap-1 border hover:border-white/30'
						>
							<ChevronLeft className='stroke-secondary-foreground size-4 shrink-0 duration-200 group-hover/settings:stroke-white' />
							<p className='text-secondary-foreground flex items-center text-sm font-extralight duration-200 group-hover/settings:text-white'>
								back to home
							</p>
						</Link>
					</Button>

					<h3 className='w-full text-center text-2xl text-white'>{notification.title}</h3>
				</div>
				<p className='text-secondary pt-10 text-lg'>{notification.description}</p>
			</div>
		</Section>
	)
}
