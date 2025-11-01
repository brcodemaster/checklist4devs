import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const useSidebar = () => {
	const path = usePathname()

	const activePath = path.split('/')[1] || '/'

	const [isHoverEnabled, setIsHoverEnabled] = useState(false)

	return { isHoverEnabled, activePath, handleClick: () => setIsHoverEnabled(!isHoverEnabled) }
}
