import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/lib/ky-instance'

import { Group, Project, User } from '@/generated/client'

export const useSearch = () => {
	const [value, setValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')

	useDebounce(
		() => {
			setDebouncedValue(value)
		},
		700,
		[value]
	)

	const { data: results = [[], [], []] } = useQuery<[User[], Project[], Group[]]>({
		queryKey: ['search-result'],
		queryFn: async () =>
			await kyInstance
				.get(`search?value=${encodeURIComponent(debouncedValue)}`)
				.json<[User[], Project[], Group[]]>(),
		enabled: !!debouncedValue.trim()
	})

	return {
		value,
		onChange: (value: string) => setValue(value),
		results
	}
}
