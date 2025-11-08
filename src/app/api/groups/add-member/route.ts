import { NextRequest } from 'next/server'

import { ApiError, ApiResponse, BASE_ERRORS, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'
import { userService } from '@/shared/lib/services/user-service'

export async function POST(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const { inviteKey, userId, groupId } = (await request.json()) as {
			inviteKey: string
			userId: string
			groupId: string
		}

		if (!inviteKey)
			throw new ApiError(
				BASE_ERRORS.BadRequest,
				'Unable to process this request. Please ask the group to resend the link.'
			)

		const INVITE_KEY = process.env.NEXT_PUBLIC_INVITE_KEY || ''

		if (inviteKey !== INVITE_KEY)
			throw new ApiError(
				BASE_ERRORS.BadRequest,
				'Unable to process this request. Please ask the group to resend the link.'
			)

		const user = await userService.findById(userId)

		const group = await groupService.addMember(groupId, user.id)

		return ApiResponse(group, 'Member added successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
