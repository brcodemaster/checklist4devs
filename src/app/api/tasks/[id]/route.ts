import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { taskService } from '@/shared/lib/services/task-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params

		const task = await taskService.findById(id)

		const { userName: creatorName } = await userService.findById(task.creatorId, {
			select: { userName: true }
		})

		const { userName: assignerName } = await userService.findById(task.assignerId, {
			select: { userName: true }
		})

		const metaTask = { ...task, creatorName, assignerName }

		return ApiResponse(metaTask, 'Task returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
