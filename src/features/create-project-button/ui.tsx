'use client'

import { ButtonHTMLAttributes } from 'react'

import { Button } from '@/shared/ui'

import { useCreateProject } from './model'

export const CreateProjectButton: React.FC<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
> = ({ ...props }) => {
	const { handleCreate } = useCreateProject()

	return (
		<Button
			onClick={() => handleCreate({ creatorId: '', groupId: '', name: '', type: 'CMS' })}
			{...props}
		>
			+ Create project
		</Button>
	)
}
