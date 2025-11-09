import { NextRequest } from 'next/server'

import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { authService } from '@/shared/lib/services/auth-service'

import { prisma } from '@/prisma-client'

export async function GET(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const url = request.nextUrl
		const searchValue = url.searchParams.get('value')

		let res: any = [[], [], []]

		if (searchValue) {
			res = await Promise.all([
				await prisma.user.findMany({
					where: {
						userName: { contains: searchValue, mode: 'insensitive' }
					}
				}),
				await prisma.project.findMany({
					where: {
						name: { contains: searchValue, mode: 'insensitive' }
					}
				}),
				await prisma.group.findMany({
					where: { name: { contains: searchValue, mode: 'insensitive' } }
				})
			])
		}

		return ApiResponse(res, 'Search values returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
