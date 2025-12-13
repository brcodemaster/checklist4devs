import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl

	// Всё что не API — пропускаем статику
	const staticPaths = ['/_next', '/favicon', '/robots', '/images', '/uploads']
	if (
		staticPaths.some(p => pathname.startsWith(p)) ||
		pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)
	) {
		return NextResponse.next()
	}

	// API пропускаем
	if (pathname.startsWith('/api')) {
		return NextResponse.next()
	}

	// Исключаем саму страницу логина
	if (pathname.startsWith('/auth/login')) {
		return NextResponse.next()
	}

	// Проверка авторизации для UI страниц
	const accessToken = req.cookies.get('x-access-token')?.value
	if (!accessToken) {
		const loginUrl = new URL('/auth/login', req.url)
		loginUrl.searchParams.set('callbackUrl', pathname)
		return NextResponse.redirect(loginUrl)
	}

	return NextResponse.next()
}
