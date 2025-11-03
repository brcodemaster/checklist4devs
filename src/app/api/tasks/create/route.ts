import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { taskService } from '@/shared/lib/services/task-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const body = (await request.json()) as Prisma.TaskUncheckedCreateInput

		const task = await taskService.create(body)

		return ApiResponse(task, 'Task created successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
