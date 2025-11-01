'use client'

import { Search } from 'lucide-react'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui'

import { SearchModal } from './search-modal'

export const SearchButton: React.FC = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='px-2'>
					<Search className='stroke-secondary-foreground size-4.5' />
				</Button>
			</DialogTrigger>
			<DialogContent showCloseButton={false} className='gap-0 overflow-hidden p-0 md:p-0'>
				<DialogTitle className='hidden' />

				<SearchModal />

				<DialogDescription className='hidden' />
			</DialogContent>
		</Dialog>
	)
}
