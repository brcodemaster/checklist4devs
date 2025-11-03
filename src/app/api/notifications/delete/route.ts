import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { notificationService } from '@/shared/lib/services/notification-service'

export async function DELETE(request: NextRequest) {
	try {
		const { id } = (await request.json()) as { id: string }

		const notification = await notificationService.delete(id)

		return ApiResponse(notification, 'Notification deleted successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
