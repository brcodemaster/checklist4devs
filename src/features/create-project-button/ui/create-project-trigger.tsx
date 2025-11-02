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

import { CreateProjectForm } from './create-project-form'

import { useCreateProject } from '../model'

export const CreateProjectTrigger: React.FC<
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
> = ({ ...props }) => {
	const hook = useCreateProject()

	return (
		<Dialog open={hook.isOpen} onOpenChange={() => hook.onOpenChange(!hook.isOpen)}>
			<DialogTrigger asChild>
				<Button {...props}>+ Create project</Button>
			</DialogTrigger>
			<DialogContent>
				<div className='space-y-1'>
					<DialogTitle>Create a new project</DialogTitle>
					<DialogDescription>Fill the fields to create a new project</DialogDescription>
				</div>

				<CreateProjectForm form={hook.form} handleCreate={hook.handleCreate} />

				<div className='flex items-center justify-end gap-2 pt-2'>
					<Button variant='secondary' type='reset' onClick={hook.handleReset}>
						Reset
					</Button>
					<Button form='createProject'>Submit</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
