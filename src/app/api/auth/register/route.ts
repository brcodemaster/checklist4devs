import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Omit<Prisma.UserUncheckedCreateInput, 'id'>

		const user = await authService.register(body)

		const {
			accessToken: _accessToken,
			refreshToken: _refreshToken,
			password: _password,
			...safeUser
		} = user

		return ApiResponse(safeUser, 'User registered successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
