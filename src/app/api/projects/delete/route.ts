import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { projectService } from '@/shared/lib/services/project-service'

export async function DELETE(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const { id } = (await request.json()) as { id: string }

		const project = await projectService.delete(id)

		return ApiResponse(project, 'Project deleted successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
