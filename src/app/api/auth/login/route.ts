import ms from 'ms'
import { NextRequest } from 'next/server'

import { ApiError, ApiResponse, BASE_ERRORS, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Pick<
			Prisma.UserUncheckedCreateInput,
			'email' | 'password'
		>

		const user = await authService.login(body)

		const { accessToken, refreshToken, password: _password, ...safeUser } = user

		const res = ApiResponse(safeUser, 'User logged successfully')

		res.cookies.set('x-access-token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: ms('1h') / 1000,
			path: '/'
		})

		if (!refreshToken) throw new ApiError(BASE_ERRORS.Unauthorized, `User not authorized`)

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
