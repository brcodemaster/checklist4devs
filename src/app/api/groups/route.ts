import { NextResponse } from 'next/server'

import { prisma } from '@/prisma-client'

export async function GET() {
	try {
		const groups = await prisma.group.findMany({ include: { projects: true } })

		const creatorIds = groups.map(group => group.creatorId)

		const creators = await prisma.user.findMany({
			where: {
				id: {
					in: creatorIds
				}
			},
			select: { id: true, userName: true }
		})

		const creatorNamesObject = Object.fromEntries(
			creators.map(creator => [creator.id, creator.userName])
		)

		const metaGroups = groups.map(group => ({
			...group,
			creatorName: creatorNamesObject[group.creatorId]
		}))

		return NextResponse.json(metaGroups)
	} catch (error) {
		console.log('Error [GROUPS API]')
	}
}
