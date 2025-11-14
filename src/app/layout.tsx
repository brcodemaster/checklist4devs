import type { Metadata } from 'next'

import { circular, ibmPlex } from '@/shared/assets'
import { Providers } from '@/shared/providers'

import './globals.css'

export const metadata: Metadata = {
	title: 'checklist4Devs'
}

export default function zzLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${circular.variable} ${ibmPlex.variable} font-circular flex h-svh w-full flex-col overflow-hidden text-white antialiased selection:bg-[#6ee7b7] selection:text-black`}
				data-scroll-behavior='smooth'
				suppressHydrationWarning
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
