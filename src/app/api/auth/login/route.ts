import ms from 'ms'
import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Pick<
			Prisma.UserUncheckedCreateInput,
			'email' | 'password'
		>

		const user = await authService.login(body)

		const { accessToken, refreshToken: _refreshToken, password: _password, ...safeUser } = user

		const res = ApiResponse(safeUser, 'User logged successfully')

		res.cookies.set('x-access-token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: ms('1h') / 1000,
			domain: 'checklist4devs.uz',
			path: '/'
		})

		return res
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
