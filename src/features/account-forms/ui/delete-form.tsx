'use client'

import { TriangleAlert } from 'lucide-react'

import { Button } from '@/shared/ui'

import { User } from '@/generated/index'

import { useAccountForms } from '../model'

export const DeleteForm: React.FC<{ user: User }> = ({ user }) => {
	const { handleDelete } = useAccountForms(user)

	return (
		<div className='bg-foreground border-muted-secondary/80 mt-4 flex items-start gap-4 rounded-lg border p-6'>
			<span className='mt-2 rounded-[3px] bg-red-400'>
				<TriangleAlert className='size-5 fill-[#1d1412] stroke-red-400' />
			</span>
			<div className='flex w-full flex-col justify-between lg:flex-row'>
				<div>
					<h4 className='text-secondary'>Request for account deletion</h4>
					<p className='text-secondary-foreground text-sm'>
						Deleting your account is permanent and cannot be undone
					</p>
				</div>
				<Button
					variant='secondary'
					className='mt-2 border-red-900 bg-red-950/50 hover:bg-red-950'
					onClick={handleDelete}
				>
					Request to delete account
				</Button>
			</div>
		</div>
	)
}
