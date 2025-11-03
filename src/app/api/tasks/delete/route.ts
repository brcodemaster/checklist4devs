import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { taskService } from '@/shared/lib/services/task-service'

export async function DELETE(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const { id } = (await request.json()) as { id: string }

		const task = await taskService.delete(id)

		return ApiResponse(task, 'Task deleted successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
