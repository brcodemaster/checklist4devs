import { PropsWithChildren } from 'react'

import { Toaster } from '../ui'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Toaster position='top-center' />
			{children}
		</>
	)
}
