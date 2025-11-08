import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'

export async function PATCH(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const { groupId, userId } = (await request.json()) as { groupId: string; userId: string }

		const group = await groupService.kick(userId, groupId)

		return ApiResponse(group, 'Member kicked successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
