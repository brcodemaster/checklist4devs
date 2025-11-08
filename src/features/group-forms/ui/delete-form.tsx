'use client'

import { TriangleAlert } from 'lucide-react'

import { Button } from '@/shared/ui'

import { useGroupForms } from '../model'

export const DeleteForm: React.FC = () => {
	const { handleDelete } = useGroupForms()

	return (
		<div className='bg-foreground border-muted-secondary/80 mt-4 flex items-start gap-4 rounded-lg border p-6'>
			<span className='mt-2 rounded-[3px] bg-red-400'>
				<TriangleAlert className='size-5 fill-[#1d1412] stroke-red-400' />
			</span>
			<div className='flex w-full flex-col justify-between lg:flex-row'>
				<div>
					<h4 className='text-secondary'>
						Deleting this group will also remove its projects
					</h4>
					<p className='text-secondary-foreground text-sm'>
						Make sure you have made a backup of your projects if you want to keep your
						data
					</p>
				</div>
				<Button
					variant='secondary'
					className='mt-2 border-red-900 bg-red-950/50 hover:bg-red-950'
					onClick={handleDelete}
				>
					Delete group
				</Button>
			</div>
		</div>
	)
}
