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
			<div className='relative flex w-full grow overflow-hidden'>
				<Sidebar />
				<main className='custom-scroll flex h-full w-full flex-col overflow-y-auto pb-5 pl-0 md:pl-[51px]'>
					{children}
				</main>
			</div>
		</>
	)
}
