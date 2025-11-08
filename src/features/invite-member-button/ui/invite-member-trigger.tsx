'use client'

import { ButtonHTMLAttributes } from 'react'

import { cn } from '@/shared/lib'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui'

import { InviteMemberForm } from './invite-member-form'

import { useInviteMember } from '../model'

export const InviteMemberTrigger: React.FC<
	{ adminIds: string[] } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
> = ({ adminIds, className, ...props }) => {
	const hook = useInviteMember(adminIds)

	return (
		<Dialog open={hook.isOpen} onOpenChange={() => hook.onOpenChange(!hook.isOpen)}>
			<DialogTrigger asChild>
				<Button
					className={cn('w-full md:w-auto', className)}
					{...props}
					disabled={!hook.isUserAdmin}
				>
					Invite member
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className='space-y-1'>
					<DialogTitle>Invite member</DialogTitle>
					<DialogDescription>Fill the fields to invite member</DialogDescription>
				</div>

				<InviteMemberForm form={hook.form} handleInvite={hook.handleInvite} />

				<div className='flex items-center justify-end gap-2 pt-2'>
					<Button variant='secondary' type='reset' onClick={hook.handleReset}>
						Reset
					</Button>
					<Button form='createProject'>Invite</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
