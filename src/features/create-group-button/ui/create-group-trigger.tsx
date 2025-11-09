import { ButtonHTMLAttributes } from 'react'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui'

import { CreateGroupForm } from './create-group-form'

import { useCreateGroup } from '../model'

export const CreateGroupTrigger: React.FC<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
> = ({ ...props }) => {
	const hook = useCreateGroup()

	return (
		<Dialog open={hook.isOpen} onOpenChange={() => hook.onOpenChange(!hook.isOpen)}>
			<DialogTrigger asChild>
				<Button {...props}>+ Create group</Button>
			</DialogTrigger>
			<DialogContent>
				<div className='space-y-1'>
					<DialogTitle>Create a new group</DialogTitle>
					<DialogDescription>Fill the fields to create a new group</DialogDescription>
				</div>

				<CreateGroupForm form={hook.form} handleCreate={hook.handleCreate} />

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
