import { NextRequest, NextResponse } from 'next/server'

import { ApiError, BASE_ERRORS, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

export async function GET(request: NextRequest) {
	try {
		const user = await authService.me(request)

		if (!user.accessToken || !user.refreshToken)
			throw new ApiError(BASE_ERRORS.Unauthorized, 'User not authorized')

		const res = NextResponse.json(user)

		res.cookies.set('x-access-token', user.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60,
			path: '/'
		})

		res.cookies.set('x-refresh-token', user.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 30,
			path: '/'
		})

		return res
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
