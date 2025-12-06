import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (
		pathname.startsWith('/auth') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon') ||
		pathname.startsWith('/robots') ||
		pathname.startsWith('/images') ||
		pathname.startsWith('/uploads') ||
		pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)
	) {
		return NextResponse.next()
	}

	const accessToken = req.cookies.get('x-access-token')?.value

	if (!accessToken) {
		const loginUrl = new URL('/auth/login', req.url)
		loginUrl.searchParams.set('callbackUrl', pathname)
		return NextResponse.redirect(loginUrl)
	}

	return NextResponse.next()
}
