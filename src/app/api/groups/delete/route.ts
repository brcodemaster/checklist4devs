import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { groupService } from '@/shared/lib/services/group-service'

export async function DELETE(request: NextRequest) {
	try {
		const { id } = (await request.json()) as { id: string }

		const group = await groupService.delete(id)

		return ApiResponse(group, 'Group deleted successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
