import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from 'react-use'

import { kyInstance } from '@/shared/api'
import { isBurningDayNear } from '@/shared/lib/utils'
import { TApiResponse } from '@/shared/types/default-types'

import { Prisma, TaskStatus } from '@/generated/client'

export const useTasks = (
	project: Prisma.ProjectGetPayload<{
		include: { tasks: true; group: { include: { developers: { include: { user: true } } } } }
	}>
) => {
	const [dateValue, setDateValue] = useState<'today' | 'month' | 'all' | 'week'>('all')
	const [statusValue, setStatusValue] = useState<TaskStatus | 'all' | 'burning'>('all')

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
						include: {
							tasks: true
							group: { include: { developers: { include: { user: true } } } }
						}
					}>
				>
			>()

			const data = res.data

			return data
		},
		initialData: project
	})

	const usersObject = Object.fromEntries(
		project.group.developers.map(({ user: developer }) => [developer.id, developer.userName])
	)

	const tasks =
		debouncedValue && data
			? data.tasks.filter(
					task =>
						task.text.toLowerCase().includes(debouncedValue.toLowerCase()) ||
						task.tag?.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase())
				)
			: data.tasks

	const dateTasks = tasks.filter(task => {
		const createdAt = new Date(task.createdAt)
		const now = new Date()

		if (dateValue === 'all') return true

		if (dateValue === 'today') {
			return createdAt.toDateString() === now.toDateString()
		}

		if (dateValue === 'week') {
			const diff = now.getTime() - createdAt.getTime()
			const days = diff / (1000 * 60 * 60 * 24)
			return days <= 7
		}

		if (dateValue === 'month') {
			const diff = now.getTime() - createdAt.getTime()
			const days = diff / (1000 * 60 * 60 * 24)
			return days <= 30
		}
	})

	const statusTasks = dateTasks.filter(task => {
		if (statusValue === 'all') return true

		if (statusValue === 'burning')
			return isBurningDayNear(task.deadlineAt) && task.status === 'IN_PROGRESS'

		return task.status === statusValue
	})

	const filteredTasks = statusTasks

	const users = project.group.developers.map(({ user }) => user)

	return {
		data,
		handleChange: setSearchValue,
		filteredTasks,
		usersObject,
		debouncedValue,
		statusValue,
		setStatusValue,
		dateValue,
		setDateValue,
		users
	}
}
