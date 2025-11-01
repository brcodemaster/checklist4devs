import { Header, MobileHeader } from '@/widgets/header'

import { Sidebar } from '@/features/sidebar'

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<MobileHeader />
			<Header />
			<div className='relative h-full w-full'>
				<Sidebar />
				<main className='pl-0 md:pl-[51px]'>{children}</main>
			</div>
		</>
	)
}
