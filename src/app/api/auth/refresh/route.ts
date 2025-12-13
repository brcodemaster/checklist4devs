import ms from 'ms'
import { NextRequest, NextResponse } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { jwtService } from '@/shared/lib/services/jwt-service'

export async function POST(request: NextRequest) {
	try {
		const token = request.cookies.get('x-access-token')?.value || ''

		const { userId } = jwtService.decode(token)

		const {
			accessToken,
			refreshToken: _refreshToken,
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

		res.headers.set('Access-Control-Allow-Origin', 'https://checklist4devs.uz')
		res.headers.set('Access-Control-Allow-Credentials', 'true')
		res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
		res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

		return res
	} catch (error) {
		return ErrorApiResponse(error)
	}
}

export async function OPTIONS() {
	const res = NextResponse.json({})
	res.headers.set('Access-Control-Allow-Origin', 'https://checklist4devs.uz')
	res.headers.set('Access-Control-Allow-Credentials', 'true')
	res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
	res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	return res
}
