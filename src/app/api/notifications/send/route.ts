import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { notificationService } from '@/shared/lib/services/notification-service'

export async function POST(request: NextRequest) {
	try {
		const { email } = await authService.checkAuth(request)

		const { message } = (await request.json()) as { message: string }

		const nots = await notificationService.send(email, message)

		return ApiResponse(nots, 'Notification sended successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
