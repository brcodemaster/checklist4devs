import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl

	// Всё что не API — проверяем авторизацию
	const isApi = pathname.startsWith('/api')

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon') ||
		pathname.startsWith('/robots') ||
		pathname.startsWith('/images') ||
		pathname.startsWith('/uploads') ||
		pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)
	) {
		return NextResponse.next()
	}

	if (isApi) {
		// API-запросы пропускаем, CORS и редирект не мешаем
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
