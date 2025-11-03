import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { taskService } from '@/shared/lib/services/task-service'

export async function DELETE(request: NextRequest) {
	try {
		const { id } = (await request.json()) as { id: string }

		const task = await taskService.delete(id)

		return ApiResponse(task, 'Task deleted successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
