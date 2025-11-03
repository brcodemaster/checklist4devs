import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { userService } from '@/shared/lib/services/user-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const body = (await request.json()) as Prisma.UserUncheckedCreateInput

		const user = await userService.create(body)

		return ApiResponse(user, 'User created successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
