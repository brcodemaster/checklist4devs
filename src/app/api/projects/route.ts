import { NextResponse } from 'next/server'

import { prisma } from '@/prisma-client'

export async function GET() {
	try {
		const projects = await prisma.project.findMany()

		const creatorIds = projects.map(project => project.creatorId)
		const groupIds = projects.map(projects => projects.groupId)

		const creators = await prisma.user.findMany({
			where: {
				id: { in: creatorIds }
			},
			select: {
				id: true,
				userName: true
			}
		})

		const groups = await prisma.group.findMany({
			where: {
				id: { in: creatorIds }
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

		return NextResponse.json(metaProjects)
	} catch (error) {
		console.log('Error [PROJECTS API]')
		return NextResponse.json(error)
	}
}
