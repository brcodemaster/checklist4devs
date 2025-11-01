import { PropsWithChildren } from 'react'

import { QueryProvider } from './query-provider'

import { Toaster } from '../ui'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<QueryProvider>
				<Toaster position='top-center' />
				{children}
			</QueryProvider>
		</>
	)
}
