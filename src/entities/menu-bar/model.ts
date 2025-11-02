import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const useMenuBar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const path = usePathname()

	const activePath = '/' + path.split('/')[1]

	return { isOpen, handleOpen: setIsOpen, activePath }
}
