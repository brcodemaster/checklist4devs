import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { taskService } from '@/shared/lib/services/task-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Prisma.TaskUncheckedCreateInput

		const task = await taskService.create(body)

		return ApiResponse(task, 'Task created successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
