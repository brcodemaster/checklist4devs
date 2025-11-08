import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { groupService } from '@/shared/lib/services/group-service'
import { projectService } from '@/shared/lib/services/project-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await authService.checkAuth(request)

		const { id } = await params

		const project = await projectService.findById(id, {
			include: { tasks: true, group: { include: { developers: true } } }
		})

		const { userName: creatorName } = await userService.findById(project.creatorId, {
			select: { userName: true }
		})

		const { name: groupName } = await groupService.findById(project.groupId, {
			select: { name: true }
		})

		const metaProject = { ...project, creatorName, groupName }

		return ApiResponse(metaProject, 'Project returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
