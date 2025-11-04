import { PropsWithChildren } from 'react'

import { QueryProvider } from './query-provider'

import { AuthContextProvider } from '../contexts/auth-context'
import { Toaster } from '../ui'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<AuthContextProvider>
				<QueryProvider>
					<Toaster position='top-center' />
					{children}
				</QueryProvider>
			</AuthContextProvider>
		</>
	)
}
