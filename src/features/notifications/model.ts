import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

import { Notification } from '@/generated/client'

export const useNotifications = () => {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { data: nots = [] } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => {
			const { data: allNots } = await kyInstance
				.get('notifications')
				.json<TApiResponse<Notification[]>>()

			const { data: nots } = await kyInstance
				.get('notifications/mine')
				.json<TApiResponse<Notification[]>>()

			return [...nots, ...allNots]
		},
		staleTime: 0
	})

	const onOpenChange = (value: boolean) => {
		setIsOpen(value)

		queryClient.invalidateQueries({ queryKey: ['notifications'] })
	}

	return {
		onOpenChange,
		isOpen,
		nots,
		newNots: nots.filter(not => not.state === 'NEW').length
	}
}
