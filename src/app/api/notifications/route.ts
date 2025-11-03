import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { notificationService } from '@/shared/lib/services/notification-service'

export async function GET() {
	try {
		const nots = await notificationService.findAll()

		return ApiResponse(nots, 'Notifications returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
