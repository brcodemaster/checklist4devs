'use client'

import { ButtonHTMLAttributes } from 'react'

import { Button } from '@/shared/ui'

import { useCreateGroup } from './model'

export const CreateGroupButton: React.FC<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
> = ({ ...props }) => {
	const { handleCreate } = useCreateGroup()

	return (
		<Button
			onClick={() => handleCreate({ creatorId: '', name: 'Bekzod', createdAt: new Date() })}
			{...props}
		>
			+ Create group
		</Button>
	)
}
