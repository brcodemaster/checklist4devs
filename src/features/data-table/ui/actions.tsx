'use client'

import { LogOut, MoreHorizontal, ShieldBanIcon, ShieldCheck, UserMinus } from 'lucide-react'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'

import { useDataTable } from '../model'

export const Actions: React.FC<{
	userId: string
	isCreator: boolean
	isCurrentUser: boolean
	isCurrentUserAdmin: boolean
	userName: string
}> = ({ isCreator, isCurrentUser, userId, userName, isCurrentUserAdmin }) => {
	const { handleKick, handleUpdateToAdmin, handleDemoteToRegular } = useDataTable()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='secondary' size='icon'>
					<MoreHorizontal className='size-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent align='end' className='overflow-hidden p-3'>
				<ul className='flex flex-col gap-1'>
					{isCurrentUser ? (
						<li>
							<Button
								size='sm'
								variant='ghost'
								onClick={() => handleKick(userId)}
								className='hover:bg-muted-secondary w-full justify-start rounded-sm p-0 px-3 text-sm'
							>
								<LogOut className='size-4 stroke-white' /> Leave group
							</Button>
						</li>
					) : (
						isCurrentUserAdmin && (
							<>
								<li>
									<Button
										size='sm'
										variant='ghost'
										onClick={() => handleKick(userId)}
										className='hover:bg-muted-secondary w-full justify-start rounded-sm p-0 px-3 text-sm'
									>
										<UserMinus className='size-4 stroke-white' /> Kick member
									</Button>
								</li>
								<li>
									<Button
										size='sm'
										variant='ghost'
										onClick={() => handleUpdateToAdmin(userId, userName)}
										className='hover:bg-muted-secondary w-full justify-start rounded-sm p-0 px-3 text-sm'
									>
										<ShieldCheck className='size-4 stroke-white' />
										Promote to Admin
									</Button>
								</li>
								<li>
									<Button
										size='sm'
										variant='ghost'
										onClick={() => handleDemoteToRegular(userId, userName)}
										className='hover:bg-muted-secondary w-full justify-start rounded-sm p-0 px-3 text-sm'
									>
										<ShieldBanIcon className='size-4 stroke-white' />
										Demote to regular member
									</Button>
								</li>
							</>
						)
					)}
				</ul>
			</PopoverContent>
		</Popover>
	)
}
