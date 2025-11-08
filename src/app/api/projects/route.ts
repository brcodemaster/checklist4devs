import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'
import { projectService } from '@/shared/lib/services/project-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const projects = await projectService.findAll({
			where: {
				isPublic: true
			}
		})

		const creatorIds = projects.map(project => project.creatorId)
		const groupIds = projects.map(project => project.groupId)

		const creators = await userService.findAll({
			where: {
				id: { in: creatorIds }
			},
			select: {
				id: true,
				userName: true
			}
		})

		const groups = await groupService.findAll({
			where: {
				id: { in: groupIds }
			},
			select: {
				id: true,
				name: true
			}
		})

		const creatorsObject = Object.fromEntries(
			creators.map(creator => [creator.id, creator.userName])
		)
		const groupsObject = Object.fromEntries(groups.map(group => [group.id, group.name]))

		const metaProjects = projects.map(project => ({
			...project,
			creatorName: creatorsObject[project.creatorId],
			groupName: groupsObject[project.groupId]
		}))

		return ApiResponse(metaProjects, 'Projects returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
