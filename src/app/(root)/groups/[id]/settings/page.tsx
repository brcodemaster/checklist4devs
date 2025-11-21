import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { Delete, Edit } from '@/widgets/group-forms'

import { groupService } from '@/shared/lib/services/group-service'
import { jwtService } from '@/shared/lib/services/jwt-service'
import { Button, Section } from '@/shared/ui'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const token = (await cookies()).get('x-access-token')?.value || ''
	const { userId } = jwtService.decode(token)

	const group = await groupService.findById(id, {
		include: {
			projects: true,
			developers: {
				include: {
					user: true
				}
			}
		}
	})

	const developers = group?.developers.map(({ user }) => user)

	const isInGroup = developers.some(developer => developer.id === userId)

	if (!isInGroup)
		return (
			<Section className='text-secondary mt-10 flex grow flex-col items-center justify-center overflow-hidden text-xl'>
				You don’t have access to this group.
			</Section>
		)

	if (!group)
		return (
			<Section className='text-secondary mt-10 flex h-full grow flex-col items-center justify-center overflow-hidden text-xl'>
				Group with this ID: #{id} is not found
			</Section>
		)

	return (
		<Section className='mt-10'>
			<Button variant='ghost' className='group/settings' asChild>
				<Link
					href={`/groups/${id}`}
					className='border-muted-secondary w-fit items-center gap-1 border hover:border-white/30'
				>
					<ChevronLeft className='stroke-secondary-foreground size-4 shrink-0 duration-200 group-hover/settings:stroke-white' />
					<p className='text-secondary-foreground flex items-center text-sm font-extralight duration-200 group-hover/settings:text-white'>
						back to group
					</p>
				</Link>
			</Button>

			<Edit name={group.name} slug={group.slug} isPublic={group.isPublic} />
			<Delete />
		</Section>
	)
}
