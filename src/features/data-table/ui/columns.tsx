'use client'

import { ColumnDef } from '@tanstack/react-table'
import { User } from 'lucide-react'

import { Actions } from './actions'

export type TTableUser = {
	id: string
	userName: string
	joinedAt: Date
	role: 'ADMIN' | 'REGULAR'
}

export const getColumns = (
	creatorIds: string[],
	creatorId: string,
	userId?: string
): ColumnDef<TTableUser>[] => {
	return [
		{
			accessorKey: 'userName',
			header: 'USER',
			cell: ({ getValue }) => (
				<div className='flex h-8 items-center gap-2' suppressHydrationWarning>
					<div className='bg-muted-secondary overflow-hidden rounded-full p-2'>
						<User className='stroke-secondary size-4' />
					</div>
					{getValue<string>()}
				</div>
			)
		},
		{
			accessorKey: 'role',
			header: 'ROLE',
			cell: ({ row }) => {
				const user = row.original
				const isOwner = user.id === creatorId

				return (
					<div className='lg:w-[150px]'>
						{isOwner ? `OWNER | ${user.role}` : user.role}
					</div>
				)
			}
		},
		{
			accessorKey: 'joinedAt',
			header: 'JOINED AT',
			cell: ({ getValue }) => getValue<Date>().toLocaleDateString()
		},
		{
			id: 'leave',
			enableHiding: false,

			cell: ({ row }) => {
				const user = row.original
				const isCurrentUser = user.id === userId
				const isCurrentUserAdmin = creatorIds.some(creator => creator === userId)
				const isCreator = creatorIds.some(creator => creator === user.id)

				if (isCurrentUserAdmin)
					return (
						<div className='flex justify-end gap-2'>
							<Actions
								isCurrentUserAdmin={isCurrentUserAdmin}
								isCreator={isCreator}
								isCurrentUser={isCurrentUser}
								userId={user.id}
								userName={user.userName}
							/>
						</div>
					)
			}
		}
	]
}
