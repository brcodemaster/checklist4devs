import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma-client'

export async function GET(req: NextRequest) {
	try {
		const url = req.nextUrl
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
