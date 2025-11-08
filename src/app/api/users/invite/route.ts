import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'
import { userService } from '@/shared/lib/services/user-service'

export async function POST(request: NextRequest) {
	try {
		const { id: userId } = await authService.checkAuth(request)

		const { groupId, invitedUserEmail } = (await request.json()) as {
			invitedUserEmail: string
			groupId: string
		}

		const group = await groupService.findById(groupId, { include: { developers: true } })

		const { email } = await userService.invite(invitedUserEmail, group, userId)

		return ApiResponse(email, 'Notification sended successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
