import ms from 'ms'
import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { jwtService } from '@/shared/lib/services/jwt-service'

export async function POST(request: NextRequest) {
	try {
		const token = request.cookies.get('x-access-token')?.value || ''

		const { userId } = jwtService.decode(token)

		const {
			accessToken,
			refreshToken,
			password: _password,
			...safeUser
		} = await authService.refreshToken(userId)

		const res = ApiResponse(safeUser, 'Tokens updated successfully')

		res.cookies.set('x-access-token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: ms('1h') / 1000,
			path: '/'
		})

		return res
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
