import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'

export async function GET(request: NextRequest) {
	try {
		const { id } = await authService.me(request)

		const groups = await groupService.findMine(id)

		return ApiResponse(groups, 'Groups returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
