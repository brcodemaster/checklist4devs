import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

import { Project } from '@/generated/client'

export const useMyProjects = () => {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')

	useDebounce(
		() => {
			setDebouncedValue(searchValue)
		},
		700,
		[searchValue]
	)

	const { data: dataProjects, isLoading } = useQuery({
		queryKey: ['projects', 'mine'],
		queryFn: async () =>
			await kyInstance
				.get('projects/mine')
				.json<TApiResponse<(Project & { creatorName: string; groupName: string })[]>>()
	})

	const projects = dataProjects?.data ?? []

	const filteredProjects =
		debouncedValue && projects
			? projects.filter(project =>
					project.name.toLowerCase().includes(debouncedValue.toLowerCase())
				)
			: projects

	return { handleChange: setSearchValue, projects: filteredProjects, isLoading }
}
