import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

export async function GET(request: NextRequest) {
	try {
		const user = await authService.me(request)

		return ApiResponse(user, 's')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
