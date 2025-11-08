import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await authService.checkAuth(request)

		const { id } = await params

		const group = await groupService.findById(id, {
			include: { developers: true, projects: true }
		})

		const { userName: creatorName } = await userService.findById(group.creatorId, {
			select: { userName: true }
		})

		const metaGroup = { ...group, creatorName }

		return ApiResponse(metaGroup, 'Group returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
