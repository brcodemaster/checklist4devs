import { NextRequest, NextResponse } from 'next/server'

import { ApiError, BASE_ERRORS, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

export async function GET(request: NextRequest) {
	try {
		const user = await authService.me(request)

		if (!user.accessToken || !user.refreshToken)
			throw new ApiError(BASE_ERRORS.Unauthorized, 'User not authorized')

		const { accessToken, refreshToken, password: _password, ...safeUser } = user

		const res = NextResponse.json(safeUser)

		res.cookies.set('x-access-token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/'
		})

		return res
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
