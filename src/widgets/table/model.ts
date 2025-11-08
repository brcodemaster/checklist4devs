import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { TTableUser, getColumns } from '@/features/data-table'

import { useAuth } from '@/shared/contexts/auth-context'

import { Prisma } from '@/generated/client'

export const useTable = (creatorIds: string[], creatorId: string, developers: TTableUser[]) => {
	const { user } = useAuth()

	const { id } = useParams<{ id: string }>()

	const [searchValue, setSearchValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')

	useDebounce(
		() => {
			setDebouncedValue(searchValue)
		},
		700,
		[searchValue]
	)

	const columns = getColumns(creatorIds, creatorId, user?.id)

	const queryClient = useQueryClient()

	const group = queryClient.getQueryData<
		Prisma.GroupGetPayload<{ include: { developers: true; projects: true } }>
	>(['group', id])

	const isInGroup = group?.developers.some(developer => developer.id === user?.id) || false

	const filteredDevelopers =
		debouncedValue && developers
			? developers.filter(developer =>
					developer.userName.toLowerCase().includes(debouncedValue.toLowerCase())
				)
			: developers

	return { user, columns, isInGroup, handleChange: setSearchValue, filteredDevelopers }
}
