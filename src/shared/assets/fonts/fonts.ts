import { IBM_Plex_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const circular = localFont({
	src: [
		{ path: './CustomFont-Book.54303b32.woff2', weight: '400', style: 'normal' },
		{ path: './CustomFont-Medium.0cc7d245.woff2', weight: '500', style: 'normal' }
	],
	display: 'swap',
	preload: false,
	variable: '--circular-font-variable',
	fallback: ['sans-serif']
})

export const ibmPlex = IBM_Plex_Mono({
	weight: ['100', '200', '300', '400', '500', '600', '700'],
	display: 'swap',
	preload: false,
	style: 'normal',
	subsets: ['latin'],
	variable: '--ibm-font-variable'
})
