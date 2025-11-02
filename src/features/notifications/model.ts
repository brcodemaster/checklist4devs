import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { kyInstance } from '@/shared/api'

import { Notification } from '@/generated/client'

export const useNotifications = () => {
	const [isOpen, setIsOpen] = useState(false)

	const { data: nots } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => kyInstance.get('notifications').json<Notification[]>()
	})

	return { onOpenChange: (value: boolean) => setIsOpen(value), isOpen, nots }
}
