import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const url = new URL(request.nextUrl)
		const isMine = Boolean((url.searchParams.get('mine') || '') === 'true')

		const groups = await groupService.findAll({
			where: {
				isPublic: isMine ? undefined : true
			},
			include: {
				projects: true
			},
			orderBy: {
				createdAt: 'asc'
			}
		})

		const creatorIds = groups.map(group => group.creatorId)

		const creators = await userService.findAll({
			where: {
				id: {
					in: creatorIds
				}
			},
			select: { id: true, userName: true }
		})

		const creatorNamesObject = Object.fromEntries(
			creators.map(creator => [creator.id, creator.userName])
		)

		const metaGroups = groups.map(group => ({
			...group,
			creatorName: creatorNamesObject[group.creatorId]
		}))

		return ApiResponse(metaGroups, 'Groups returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
