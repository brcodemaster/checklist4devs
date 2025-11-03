import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { projectService } from '@/shared/lib/services/project-service'

export async function GET(request: NextRequest) {
	try {
		const { id } = await authService.me(request)

		const projects = await projectService.findMine(id)

		return ApiResponse(projects, 'Projects returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
