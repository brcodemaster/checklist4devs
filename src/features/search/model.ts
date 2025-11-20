import { useQuery } from '@tanstack/react-query'
import { useEffect, useEffectEvent, useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

import { Group, Project } from '@/generated/client'

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

	const { data: results = [[], []], refetch } = useQuery<[Project[], Group[]]>({
		queryKey: ['search-result'],
		queryFn: async () => {
			const res = await kyInstance
				.get(`search?value=${encodeURIComponent(debouncedValue)}`)
				.json<TApiResponse<[Project[], Group[]]>>()

			return res.data
		},
		enabled: false
	})

	const refetchStable = useEffectEvent(() => {
		refetch()
	})

	useEffect(() => {
		if (!debouncedValue.trim()) return

		refetchStable()
	}, [debouncedValue])

	return {
		searchValue,
		onChange: (value: string) => setSearchValue(value),
		projects: results[0],
		groups: results[1]
	}
}
