'use client'

import { PropsWithChildren, createContext, useContext } from 'react'

import { TLoginForm } from '@/features/login/model'
import { TRegisterForm } from '@/features/register/model'

import { useAuthContext } from './model'
import { User } from '@/generated/client'

type TContext = {
	user: Omit<User, 'accessToken' | 'refreshToken' | 'password'> | null
	isAuthenticated: boolean
	login: (payload: TLoginForm) => void
	logout: () => void
	checkAuth: () => void
	register: (payload: TRegisterForm) => void
	isLoading: boolean
}

export const AuthContext = createContext<TContext | null>(null)

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { value } = useAuthContext()

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) throw new Error('useAuth must be in AuthContextProvider')

	return context
}
