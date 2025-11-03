import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { groupService } from '@/shared/lib/services/group-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params

		const group = await groupService.findById(id)

		const { userName: creatorName } = await userService.findById(group.creatorId, {
			select: { userName: true }
		})

		const metaGroup = { ...group, creatorName }

		return ApiResponse(metaGroup, 'Group returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
