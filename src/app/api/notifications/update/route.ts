import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { notificationService } from '@/shared/lib/services/notification-service'

import { Prisma } from '@/generated/client'

export async function PATCH(request: NextRequest) {
	try {
		const { id, payload } = (await request.json()) as {
			id: string
			payload: Prisma.NotificationUncheckedUpdateInput
		}

		const notification = await notificationService.update(id, payload)

		return ApiResponse(notification, 'Notification updated successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
