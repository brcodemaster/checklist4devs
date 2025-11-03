import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { userService } from '@/shared/lib/services/user-service'

import { Prisma } from '@/generated/client'

export async function PATCH(request: NextRequest) {
	try {
		const { id, payload } = (await request.json()) as {
			id: string
			payload: Prisma.UserUncheckedUpdateInput
		}

		const user = await userService.update(id, payload)

		return ApiResponse(user, 'User updated successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
