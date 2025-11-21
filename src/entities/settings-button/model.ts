import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useAuth } from '@/shared/contexts/auth-context'

import { Prisma } from '@/generated/client'

export const useSettingsButton = () => {
	const { user } = useAuth()

	const { id } = useParams<{ id: string }>()

	const queryClient = useQueryClient()

	const group = queryClient.getQueryData<
		Prisma.GroupGetPayload<{
			include: { developers: { include: { user: true } }; projects: true }
		}>
	>(['group', id])

	const developers = group?.developers.map(({ user }) => user)

	const isInGroup = developers?.some(developer => developer.id === user?.id) || false

	return { isInGroup, id }
}
