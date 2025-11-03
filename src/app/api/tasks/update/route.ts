import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { taskService } from '@/shared/lib/services/task-service'

import { Prisma } from '@/generated/client'

export async function PATCH(request: NextRequest) {
	try {
		const { id, payload } = (await request.json()) as {
			id: string
			payload: Prisma.TaskUncheckedUpdateInput
		}

		const task = await taskService.update(id, payload)

		return ApiResponse(task, 'Task updated successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
