import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { taskService } from '@/shared/lib/services/task-service'

export async function GET(request: NextRequest) {
	try {
		const { id } = await authService.me(request)

		const tasks = await taskService.findMine(id)

		return ApiResponse(tasks, 'Tasks returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
