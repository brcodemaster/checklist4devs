import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { notificationService } from '@/shared/lib/services/notification-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const body = (await request.json()) as Prisma.NotificationUncheckedCreateInput

		const notification = await notificationService.create(body)

		return ApiResponse(notification, 'Notification created successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
