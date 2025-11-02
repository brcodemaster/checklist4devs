import { usePathname } from 'next/navigation'

export const useActivePath = () => {
	const path = usePathname()
	const activePath = path.split('/')[1] || 'Home'
	const link = activePath === 'Home' ? '/' : activePath

	return { activePath: activePath.slice(0, 1).toUpperCase() + activePath.slice(1), link }
}
