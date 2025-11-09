import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

import { Group, Project, User } from '@/generated/client'

export const useSearch = () => {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')

	useDebounce(
		() => {
			setDebouncedValue(searchValue)
		},
		700,
		[searchValue]
	)

	const { data: results = [[], [], []] } = useQuery<[User[], Project[], Group[]]>({
		queryKey: ['search-result'],
		queryFn: async () => {
			const res = await kyInstance
				.get(`search?value=${encodeURIComponent(debouncedValue)}`)
				.json<TApiResponse<[User[], Project[], Group[]]>>()

			return res.data
		},
		enabled: !!debouncedValue.trim()
	})

	return {
		searchValue,
		onChange: (value: string) => setSearchValue(value),
		results
	}
}
