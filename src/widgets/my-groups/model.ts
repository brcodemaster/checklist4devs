import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'

import { Prisma } from '@/generated/client'

export const useMyGroups = () => {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')

	useDebounce(
		() => {
			setDebouncedValue(searchValue)
		},
		700,
		[searchValue]
	)

	const { data: groups = [], isLoading } = useQuery({
		queryKey: ['groups', 'mine'],
		queryFn: async () =>
			await kyInstance
				.get('groups/mine')
				.json<
					(Prisma.GroupGetPayload<{ include: { projects: true } }> & {
						creatorName: string
					})[]
				>()
	})

	const filteredGroups = debouncedValue
		? groups.filter(group => group.name.toLowerCase().includes(debouncedValue.toLowerCase()))
		: groups

	return { handleChange: setSearchValue, groups: filteredGroups, isLoading }
}
