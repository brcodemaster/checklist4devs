import { useState } from 'react'

export const useMenuBar = () => {
	const [isOpen, setIsOpen] = useState(false)

	return { isOpen, handleOpen: setIsOpen }
}
