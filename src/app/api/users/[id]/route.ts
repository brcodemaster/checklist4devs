import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await authService.checkAuth(request)

		const { id } = await params

		const user = await userService.findById(id, {
			include: {
				groups: { select: { id: true, name: true } }
			}
		})

		return ApiResponse(user, 'User returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
