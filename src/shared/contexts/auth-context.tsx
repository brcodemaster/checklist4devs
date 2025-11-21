'use client'

import { PropsWithChildren, createContext, useContext } from 'react'

import { TLoginForm } from '@/features/login/model'
import { TRegisterForm } from '@/features/register/model'

import { useAuthContext } from './model'

import { TSafeUser } from '../types/default-types'

type TContext = {
	user: TSafeUser | null
	isAuthenticated: boolean
	login: (payload: TLoginForm) => Promise<string | number | undefined>
	logout: () => Promise<string | number | undefined>
	checkAuth: () => Promise<void>
	register: (payload: TRegisterForm) => Promise<string | number | undefined>
	isLoading: boolean
}

export const AuthContext = createContext<TContext | null>(null)

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const value = useAuthContext()

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) throw new Error('useAuth must be in AuthContextProvider')

	return context
}
