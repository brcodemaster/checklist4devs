import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'
import { projectService } from '@/shared/lib/services/project-service'

import { Prisma } from '@/generated/client'

export async function POST(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const body = (await request.json()) as Prisma.ProjectUncheckedCreateInput

		const project = await projectService.create(body)

		return ApiResponse(project, 'Project created successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
