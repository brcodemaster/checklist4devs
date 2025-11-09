import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'
import { projectService } from '@/shared/lib/services/project-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id: userId } = await authService.checkAuth(request)

		const { id } = await params

		const group = await groupService.findById(id, {
			include: {
				developers: {
					orderBy: {
						createdAt: 'desc'
					}
				}
			}
		})

		const isMember = group.developers.some(developer => developer.id === userId)

		const projects = await projectService.findAll({
			where: {
				groupId: group.id,
				isPublic: isMember ? undefined : true
			},
			orderBy: {
				createdAt: 'asc'
			}
		})

		const { userName: creatorName } = await userService.findById(group.creatorId, {
			select: { userName: true }
		})

		const metaGroup = { ...group, projects, creatorName }

		return ApiResponse(metaGroup, 'Group returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
