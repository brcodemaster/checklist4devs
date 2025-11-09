import { NextRequest, NextResponse } from 'next/server'

import { ApiError, BASE_ERRORS, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'

export async function GET(request: NextRequest) {
	try {
		const user = await authService.me(request)

		if (!user.accessToken || !user.refreshToken)
			throw new ApiError(BASE_ERRORS.Unauthorized, 'User not authorized')

		const { accessToken, refreshToken, password: _password, ...safeUser } = user

		const groups = await groupService.findAll({
			where: {
				OR: [{ creatorId: user.id }, { admins: { has: user.id } }]
			},
			select: {
				id: true,
				name: true
			}
		})

		const safeUserWithGroups = { ...safeUser, groups }

		const res = NextResponse.json(safeUserWithGroups)

		res.cookies.set('x-access-token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60,
			path: '/'
		})

		res.cookies.set('x-refresh-token', refreshToken, {
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
