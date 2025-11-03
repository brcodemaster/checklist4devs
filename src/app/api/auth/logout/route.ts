import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

import { User } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Pick<User, 'id'>

		const user = await authService.logout(body)

		const { accessToken, refreshToken, password: _password, ...safeUser } = user

		const res = ApiResponse(safeUser, 'User logged out successfully')

		res.cookies.set('x-access-token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 0,
			path: '/'
		})

		res.cookies.set('x-refresh-token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 0,
			path: '/'
		})

		return res
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
