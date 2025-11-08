'use client'

import { Search } from 'lucide-react'

import { DataTable, TTableUser } from '@/features/data-table'
import { InviteMemberTrigger } from '@/features/invite-member-button'

import { SettingsButton } from '@/entities/settings-button'

import { cn } from '@/shared/lib'
import { Input } from '@/shared/ui'

import { useTable } from './model'

export const Table: React.FC<{
	creatorIds: string[]
	developers: TTableUser[]
	creatorId: string
}> = ({ creatorIds, developers, creatorId }) => {
	const { columns, isInGroup, handleChange, filteredDevelopers } = useTable(
		creatorIds,
		creatorId,
		developers
	)

	return (
		<>
			<div
				className={cn(
					'grid grid-cols-1 grid-rows-2 items-center gap-x-2 gap-y-2 px-0 pb-2 md:grid-cols-[1fr_auto] md:grid-rows-1',
					isInGroup ? 'md:grid-cols-[1fr_auto]' : 'md:grid-cols-[1fr]'
				)}
			>
				<div className='relative order-1 row-start-1 w-full'>
					<Input
						className='bg-input w-full pl-9 placeholder:opacity-50'
						placeholder='Search for members'
						onChange={e => handleChange(e.target.value)}
					/>
					<Search className='stroke-secondary-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
				</div>
				{isInGroup && (
					<div className='order-2 row-start-2 flex w-full items-center gap-2 md:row-start-1 md:justify-end'>
						<InviteMemberTrigger adminIds={creatorIds} />
						<SettingsButton />
					</div>
				)}
			</div>
			<DataTable columns={columns} data={filteredDevelopers} length={developers.length} />
		</>
	)
}
