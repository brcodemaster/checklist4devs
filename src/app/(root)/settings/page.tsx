import { cookies } from 'next/headers'

import { Delete, Edit } from '@/widgets/account-forms'

import { jwtService } from '@/shared/lib/services/jwt-service'
import { userService } from '@/shared/lib/services/user-service'
import { Section } from '@/shared/ui'

export default async function Page() {
	const token = (await cookies()).get('x-access-token')?.value || ''
	const { userId } = jwtService.decode(token)

	const user = await userService.findById(userId)

	if (!user)
		return (
			<Section className='text-secondary mt-10 flex h-full grow flex-col items-center justify-center overflow-hidden text-xl'>
				User with this ID: #{userId} is not found
			</Section>
		)

	return (
		<Section className='mt-10'>
			<Edit user={user} />
			<Delete user={user} />
		</Section>
	)
}
