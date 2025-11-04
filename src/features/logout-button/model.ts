import { useAuth } from '@/shared/contexts/auth-context'

export const useLogoutButton = () => {
	const { logout } = useAuth()

	const handleClick = () => logout()

	return { handleClick }
}
