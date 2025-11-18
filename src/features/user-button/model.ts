import { useState } from 'react'

import { useAuth } from '@/shared/contexts/auth-context'

export const useUserButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { user } = useAuth()

	return { isOpen, onOpenChange: setIsOpen, user }
}
