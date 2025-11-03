import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const body = (await request.json()) as Prisma.GroupUncheckedCreateInput

		const group = await groupService.create(body)

		return ApiResponse(group, 'Group created successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
