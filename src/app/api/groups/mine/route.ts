import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(request: NextRequest) {
	try {
		const { id } = await authService.me(request)

		const groups = await groupService.findMine(id, { include: { projects: true } })

		const creatorIds = groups.map(group => group.creatorId)

		const creators = await userService.findAll({
			where: {
				id: {
					in: creatorIds
				}
			},
			select: {
				id: true,
				userName: true
			}
		})

		const creatorsObject = Object.fromEntries(
			creators.map(creator => [creator.id, creator.userName])
		)

		const metaGroups = groups.map(group => ({
			...group,
			creatorName: creatorsObject[group.creatorId]
		}))

		return ApiResponse(metaGroups, 'Groups returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
