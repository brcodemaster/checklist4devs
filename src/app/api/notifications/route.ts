import { NextResponse } from 'next/server'

import { prisma } from '@/prisma-client'

export async function GET() {
	try {
		const nots = await prisma.notification.findMany()

		return NextResponse.json(nots)
	} catch (error) {
		return NextResponse.json(error)
	}
}
