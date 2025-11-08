import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

import { Prisma } from '@/generated/client'

export const useGroups = () => {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')

	useDebounce(
		() => {
			setDebouncedValue(searchValue)
		},
		700,
		[searchValue]
	)

	const { data: groups = [], isLoading: groupsIsLoading } = useQuery({
		queryKey: ['groups'],
		queryFn: async () => {
			const res = await kyInstance.get('groups').json<
				TApiResponse<
					(Prisma.GroupGetPayload<{ include: { projects: true } }> & {
						creatorName: string
					})[]
				>
			>()

			return res.data
		}
	})

	const { data: projects = [], isLoading: projectsIsLoading } = useQuery({
		queryKey: ['projects'],
		queryFn: async () => {
			const res = await kyInstance.get('projects').json<
				TApiResponse<
					(Prisma.ProjectGetPayload<{ include: { group: true } }> & {
						creatorName: string
						groupName: string
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
	const filteredProjects =
		debouncedValue && projects
			? projects.filter(project =>
					project.name.toLowerCase().includes(debouncedValue.toLowerCase())
				)
			: projects

	return {
		groups: filteredGroups,
		projects: filteredProjects,
		groupsIsLoading,
		projectsIsLoading,
		handleChange: setSearchValue
	}
}
