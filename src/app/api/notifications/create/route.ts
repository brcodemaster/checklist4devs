import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { notificationService } from '@/shared/lib/services/notification-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as Prisma.NotificationUncheckedCreateInput

		const notification = await notificationService.create(body)

		return ApiResponse(notification, 'Notification created successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
