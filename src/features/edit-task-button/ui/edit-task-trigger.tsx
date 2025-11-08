'use client'

import { Edit } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui'

import { EditTaskForm } from './edit-task-form'
import { Task, User } from '@/generated/client'

import { useEditTask } from '../model'

type Props = { task: Task; users: User[] }

export const EditTaskTrigger: React.FC<Props> = ({ task, users }) => {
	const hook = useEditTask(task)

	return (
		<Dialog open={hook.isOpen} onOpenChange={hook.onOpenChange}>
			<DialogTrigger asChild>
				<Button
					variant='ghost'
					className='px-2 opacity-100 duration-100 lg:opacity-50 lg:hover:opacity-100'
					onClick={() => hook.onOpenChange(!hook.isOpen)}
				>
					<Edit
						className={cn(
							'stroke-secondary size-4',
							task.status === 'FIRED' && 'stroke-fired',
							task.status === 'COMPLETED' && 'stroke-completed'
						)}
					/>
				</Button>
			</DialogTrigger>
			<DialogContent showCloseButton={false} onOpenAutoFocus={e => e.preventDefault()}>
				<div className='space-y-1'>
					<DialogTitle>Edit existing task</DialogTitle>
					<DialogDescription>Fill the fields to update the task</DialogDescription>
				</div>

				<div>
					<EditTaskForm form={hook.form} handleSubmit={hook.handleEdit} users={users} />
				</div>

				<div className='flex items-center justify-end gap-2 pt-2'>
					<Button variant='secondary' type='reset' onClick={hook.handleReset}>
						Reset
					</Button>
					<Button form='createGroup'>Update</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
