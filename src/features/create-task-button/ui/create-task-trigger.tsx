'use client'

import { ButtonHTMLAttributes } from 'react'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui'

import { CreateTaskForm } from './create-task-form'
import { User } from '@/generated/client'

import { useCreateTask } from '../model'

export const CreateTaskTrigger: React.FC<
	{ users: User[]; projectId: string; lastIndex: number } & Omit<
		ButtonHTMLAttributes<HTMLButtonElement>,
		'onClick'
	>
> = ({ users, projectId, lastIndex, ...props }) => {
	const hook = useCreateTask(projectId, users, lastIndex)

	return (
		<Dialog open={hook.isOpen} onOpenChange={() => hook.onOpenChange(!hook.isOpen)}>
			<DialogTrigger asChild>
				<Button {...props}>+ Create task</Button>
			</DialogTrigger>
			<DialogContent>
				<div className='space-y-1'>
					<DialogTitle>Create a task</DialogTitle>
					<DialogDescription>Fill the fields to create a new task</DialogDescription>
				</div>

				<div>
					<CreateTaskForm
						form={hook.form}
						handleCreate={hook.handleCreate}
						users={users}
					/>
				</div>

				<div className='flex items-center justify-end gap-2 pt-2'>
					<Button variant='secondary' type='reset' onClick={hook.handleReset}>
						Reset
					</Button>
					<Button form='createGroup'>Create</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
