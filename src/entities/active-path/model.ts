import { usePathname } from 'next/navigation'

export const useActivePath = () => {
	const path = usePathname()
	const activePath = path.split('/')[0] || 'Home'
	const link = activePath === 'Home' ? '/' : activePath

	return { activePath, link }
}
