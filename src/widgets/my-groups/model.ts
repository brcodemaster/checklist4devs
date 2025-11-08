import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

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
		queryFn: async () => {
			const res = await kyInstance.get('groups/mine').json<
				TApiResponse<
					(Prisma.GroupGetPayload<{ include: { projects: true } }> & {
						creatorName: string
					})[]
				>
			>()

			return res.data
		}
	})

	const filteredGroups =
		debouncedValue && groups
			? groups.filter(group =>
					group.name.toLowerCase().includes(debouncedValue.toLowerCase())
				)
			: groups

	return { handleChange: setSearchValue, groups: filteredGroups, isLoading }
}
