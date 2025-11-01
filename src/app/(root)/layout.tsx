import { Header, MobileHeader } from '@/widgets/header'

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<MobileHeader />
			<Header />
			<div>
				<main>{children}</main>
			</div>
		</>
	)
}
