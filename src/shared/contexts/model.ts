import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { TLoginForm } from '@/features/login/model'
import { TRegisterForm } from '@/features/register/model'

import { kyInstance } from '../api'
import { PUBLIC_ROUTES } from '../constants'
import { ApiError } from '../lib'
import { TApiResponse, TSafeUser } from '../types/default-types'

export const useAuthContext = () => {
	const router = useRouter()

	const [user, setUser] = useState<TSafeUser | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const pathname = usePathname()
	const callbackUrl = useSearchParams().get('callbackUrl')

	const login = async (payload: TLoginForm) => {
		try {
			setIsLoading(true)
			const { data: user } = await kyInstance
				.post('auth/login', { json: payload })
				.json<TApiResponse<TSafeUser>>()

			setUser(user)
			setIsAuthenticated(true)

			router.push(callbackUrl ?? '/')
		} catch (error) {
			setUser(null)
			if (error instanceof ApiError) {
				return toast.error(error.message)
			}

			toast.error('Something went wrong during login')
		} finally {
			setIsLoading(false)
		}
	}

	const logout = async () => {
		try {
			setIsLoading(true)

			await kyInstance.post('auth/logout').json<TApiResponse<null>>()

			setIsAuthenticated(false)
			setUser(null)
			router.push('/auth/login')
		} catch (error) {
			if (error instanceof ApiError) {
				return toast.error(error.message)
			}

			toast.error('Something went wrong during logout')
		} finally {
			setIsLoading(false)
		}
	}

	const register = async (payload: TRegisterForm) => {
		try {
			setIsLoading(true)

			await kyInstance
				.post('auth/register', { json: payload })
				.json<TApiResponse<TSafeUser>>()

			await login({ email: payload.email, password: payload.password })
		} catch (error) {
			if (error instanceof ApiError) {
				return toast.error(error.message)
			}

			toast.error('Something went wrong during register')
		} finally {
			setIsLoading(false)
		}
	}

	const checkAuth = async () => {
		try {
			const user = await kyInstance.get('auth/me').json<TSafeUser>()

			setUser(user)
			setIsAuthenticated(true)
		} catch (error) {
			setIsAuthenticated(false)
			setUser(null)

			if (error instanceof ApiError) {
				return toast.error(error.message)
			}

			toast.error('Something went wrong during checkAuth')
		}
	}

	useEffect(() => {
		if (!PUBLIC_ROUTES.includes(pathname)) checkAuth()
	}, [pathname])

	const value = {
		user,
		login,
		logout,
		checkAuth,
		isAuthenticated,
		isLoading,
		register
	}

	return { value }
}
