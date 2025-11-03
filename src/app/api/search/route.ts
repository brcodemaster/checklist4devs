import { NextRequest, NextResponse } from 'next/server'

import { authService } from '@/shared/lib/services/auth-service'

import { prisma } from '@/prisma-client'

export async function GET(request: NextRequest) {
	try {
		await authService.checkAuth(request)

		const url = request.nextUrl
		const searchValue = url.searchParams.get('value')

		let res

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

			return NextResponse.json(res)
		}

		return NextResponse.json([[], [], []])
	} catch (error) {
		return NextResponse.json('Error [SEARCH API]')
	}
}
