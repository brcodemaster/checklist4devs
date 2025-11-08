import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

import { Prisma } from '@/generated/client'

export const useTasks = (
	project: Prisma.ProjectGetPayload<{
		include: { tasks: true; group: { include: { developers: true } } }
	}>
) => {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState('')

	useDebounce(
		() => {
			setDebouncedValue(searchValue)
		},
		700,
		[searchValue]
	)

	const { id } = useParams<{ id: string }>()

	const { data } = useQuery({
		queryKey: ['project', id],
		queryFn: async () => {
			const res = await kyInstance.get(`projects/${id}`).json<
				TApiResponse<
					Prisma.ProjectGetPayload<{
						include: { tasks: true; group: { include: { developers: true } } }
					}>
				>
			>()

			const data = res.data

			return data
		},
		initialData: project
	})

	const usersObject = Object.fromEntries(
		project.group.developers.map(developer => [developer.id, developer.userName])
	)

	const filteredTasks =
		debouncedValue && data
			? data.tasks.filter(task =>
					task.text.toLowerCase().includes(debouncedValue.toLowerCase())
				)
			: data.tasks

	return { data, handleChange: setSearchValue, filteredTasks, usersObject }
}
