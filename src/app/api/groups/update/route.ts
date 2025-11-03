import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { groupService } from '@/shared/lib/services/group-service'

import { Prisma } from '@/generated/client'

export async function PATCH(request: NextRequest) {
	try {
		const { id, payload } = (await request.json()) as {
			id: string
			payload: Prisma.GroupUncheckedUpdateInput
		}

		const group = await groupService.update(id, payload)

		return ApiResponse(group, 'Group updated successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
