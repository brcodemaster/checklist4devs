import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const users = await userService.findAll({
			include: {
				groups: true
			},
			orderBy: {
				createdAt: 'asc'
			}
		})

		return ApiResponse(users, 'Users returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
