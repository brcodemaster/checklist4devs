import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { userService } from '@/shared/lib/services/user-service'

export async function DELETE(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const { id } = (await request.json()) as { id: string }

		const user = await userService.delete(id)

		return ApiResponse(user, 'User deleted successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
