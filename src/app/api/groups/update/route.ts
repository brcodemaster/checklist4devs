import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'

import { Prisma } from '@/generated/client'

export async function PATCH(request: NextRequest) {
	try {
		const { id: userId } = await authService.checkAuth(request)

		const { id, payload } = (await request.json()) as {
			id: string
			payload: Prisma.GroupUncheckedUpdateInput & { admin: string }
		}

		const group = await groupService.update(id, payload, userId)

		return ApiResponse(group, 'Group updated successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
