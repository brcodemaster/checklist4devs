import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { projectService } from '@/shared/lib/services/project-service'

import { Prisma } from '@/generated/client'

export async function PATCH(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const { id, payload } = (await request.json()) as {
			id: string
			payload: Prisma.ProjectUncheckedUpdateInput
		}

		const project = await projectService.update(id, payload)

		return ApiResponse(project, 'Project updated successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
