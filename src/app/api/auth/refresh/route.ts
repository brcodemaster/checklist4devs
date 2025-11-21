import ms from 'ms'
import { NextRequest } from 'next/server'

import { ApiError, ApiResponse, BASE_ERRORS, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

import { prisma } from '@/prisma-client'

export async function POST(request: NextRequest) {
	try {
		const token = request.cookies.get('x-access-token')?.value || ''
		const xRefreshToken = request.cookies.get('x-refresh-token')?.value || ''

		const isRegisteredUser = await prisma.user.findFirst({
			where: {
				refreshToken: xRefreshToken
			}
		})

		if (!isRegisteredUser)
			throw new ApiError(BASE_ERRORS.Unauthorized, `User not authenticated`)

		const {
			accessToken,
			refreshToken,
			password: _password,
			...safeUser
		} = await authService.refreshToken(token, isRegisteredUser.id)

		const res = ApiResponse(safeUser, 'Tokens updated successfully')

		res.cookies.set('x-access-token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: ms('1h') / 1000,
			path: '/'
		})

		res.cookies.set('x-refresh-token', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: ms('30d') / 1000,
			path: '/'
		})

		return res
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
