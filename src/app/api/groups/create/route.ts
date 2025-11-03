import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { groupService } from '@/shared/lib/services/group-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Prisma.GroupUncheckedCreateInput

		const group = await groupService.create(body)

		return ApiResponse(group, 'Group created successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
