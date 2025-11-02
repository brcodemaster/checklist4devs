import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import { toast } from 'sonner'

import { kyInstance } from '@/shared/lib/ky-instance'

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
		queryFn: async () =>
			await kyInstance.get('groups').json<
				(Prisma.GroupGetPayload<{ include: { projects: true } }> & {
					creatorName: string
				})[]
			>(),
		meta: {
			onError: (error: unknown) => {
				if (error instanceof Error) {
					toast.error(error.message)
				} else {
					toast.error('Unexpected error occurred.')
				}
			}
		}
	})

	const { data: projects = [], isLoading: projectsIsLoading } = useQuery({
		queryKey: ['projects'],
		queryFn: async () =>
			await kyInstance.get('projects').json<
				(Prisma.ProjectGetPayload<{ include: { group: true } }> & {
					creatorName: string
					groupName: string
				})[]
			>()
	})

	const filteredGroups = debouncedValue
		? groups.filter(group => group.name.toLowerCase().includes(debouncedValue.toLowerCase()))
		: groups
	const filteredProjects = debouncedValue
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
