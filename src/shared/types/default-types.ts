import { JwtPayload } from 'jsonwebtoken'

import { User } from '@/generated/client'

export type TApiResponse<T = unknown> = {
	success: boolean
	message: string
	data: T
}

export type TJwtPayload = {
	userId: string
} & JwtPayload

export type TSafeUser = Omit<User, 'accessToken' | 'refreshToken' | 'password'>
