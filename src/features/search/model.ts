import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

import { Group, Project } from '@/generated/client'

export const useSearch = () => {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)

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
			setIsLoading(true)

			const res = await kyInstance
				.get(`search?value=${encodeURIComponent(debouncedValue)}`)
				.json<TApiResponse<[Project[], Group[]]>>()

			setIsLoading(false)

			return res.data
		},

		enabled: false
	})

	useEffect(() => {
		if (!debouncedValue.trim()) return

		refetch()
	}, [debouncedValue])

	return {
		searchValue,
		onChange: (value: string) => setSearchValue(value),
		projects: results[0],
		groups: results[1],
		debouncedValue,
		isLoading,
		hasQuery: debouncedValue.trim().length > 0,
		hasResults: (results[0]?.length ?? 0) > 0 || (results[1]?.length ?? 0) > 0
	}
}
