import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { notificationService } from '@/shared/lib/services/notification-service'

export async function GET(request: NextRequest) {
	try {
		const { id } = await authService.checkAuth(request)

		const publicNots = await notificationService.findAll({
			where: {
				isPublic: true
			},
			orderBy: { index: 'asc' }
		})

		const personalNots = await notificationService.findMine(id, { orderBy: { index: 'asc' } })

		const nots = [...publicNots, ...personalNots]

		return ApiResponse(nots, 'Notifications returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
