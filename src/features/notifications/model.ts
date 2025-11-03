import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { kyInstance } from '@/shared/api'
import { TApiResponse } from '@/shared/types/default-types'

import { Notification } from '@/generated/client'

export const useNotifications = () => {
	const [isOpen, setIsOpen] = useState(false)

	const { data: dataNots } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => kyInstance.get('notifications').json<TApiResponse<Notification[]>>()
	})

	const nots = dataNots?.data ?? []

	return { onOpenChange: (value: boolean) => setIsOpen(value), isOpen, nots }
}
