'use client'

import { Pen, Trash } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/shared/lib/utils'
import { Button, Checkbox, Tooltip } from '@/shared/ui'
import { TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'

import { useTaskCard } from './model'
import { Task, User } from '@/generated/client'

import { EditTaskTrigger } from '../edit-task-button'

type Props = {
	task: Task
	index: number
	assignee?: string
	creator?: string
	users: User[]
}

export const TaskCard: React.FC<Props> = ({ task, index, assignee, creator, users }) => {
	const { handleDelete, handleUpdateStatus, isBurningDayNear, prettyDateMaker, isCreator } =
		useTaskCard(task)

	return (
		<div
			className={cn(
				'border-muted-secondary bg-card hover:bg-card-hover group/card relative flex min-h-44 cursor-pointer flex-col justify-between overflow-hidden rounded-md border p-4 duration-100',
				task.status === 'FIRED' && 'text-fired cursor-not-allowed line-through'
			)}
			onClick={() => handleUpdateStatus()}
		>
			<div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<h4
							className={cn(
								'text-secondary flex items-center gap-1 text-lg font-medium',
								task.status === 'FIRED' && 'text-fired',
								task.status === 'COMPLETED' && 'text-completed'
							)}
							suppressHydrationWarning
						>
							<Checkbox
								status={task.status}
								checked={task.status !== 'IN_PROGRESS'}
								className='cursor-pointer'
							/>
							Task for {assignee}
						</h4>
						{task.status === 'IN_PROGRESS' && isBurningDayNear(task.deadlineAt) && (
							<Tooltip>
								<TooltipTrigger className='cursor-pointer'>
									<div className='relative ml-2 h-4 w-4' suppressHydrationWarning>
										<Image
											src='/fire.gif'
											alt='Fire gif'
											width={16}
											height={16}
											className='size-full object-cover'
											unoptimized
											unselectable='off'
										/>
									</div>
								</TooltipTrigger>
								<TooltipContent className='text-white'>
									The burning day is near
								</TooltipContent>
							</Tooltip>
						)}
					</div>
					<div
						className={cn(
							'h-9 opacity-100 duration-100 lg:opacity-0 lg:group-hover/card:opacity-100'
						)}
						onClick={e => e.stopPropagation()}
					>
						{isCreator && (
							<>
								<EditTaskTrigger task={task} users={users} />
								<Button
									variant='ghost'
									className='px-2 opacity-100 duration-100 lg:opacity-50 lg:hover:opacity-100'
									onClick={() => handleDelete.mutateAsync()}
								>
									<Trash
										className={cn(
											'stroke-secondary size-4',
											task.status === 'FIRED' && 'stroke-fired',
											task.status === 'COMPLETED' && 'stroke-completed'
										)}
									/>
								</Button>
							</>
						)}
					</div>
				</div>
				<p
					className={cn(
						'text-secondary/60 pt-2 text-base',
						task.status === 'FIRED' && 'text-fired',
						task.status === 'COMPLETED' && 'text-completed'
					)}
					suppressHydrationWarning
				>
					{task.text}
				</p>
			</div>
			<div
				className={cn(
					'border-t-secondary-foreground/20 text-secondary/60 mt-6 flex items-center justify-between border-t pt-2 text-xs',
					task.status === 'FIRED' && 'text-fired',
					task.status === 'COMPLETED' && 'text-completed'
				)}
			>
				<p>{prettyDateMaker(new Date(task.createdAt))}</p>
				<p className='flex items-center gap-1'>
					<Pen
						className={cn(
							'stroke-secondary-foreground/60 fill-secondary-foreground/60 size-3',
							task.status === 'FIRED' && 'stroke-fired fill-fired',
							task.status === 'COMPLETED' && 'stroke-completed fill-completed'
						)}
					/>
					{creator}
				</p>
				<p>{prettyDateMaker(new Date(task.deadlineAt))}</p>
			</div>
			<span
				className='text-secondary-foreground! absolute bottom-14 -left-4 text-[200px] leading-0 font-bold opacity-6 select-none'
				suppressHydrationWarning
			>
				{index}
			</span>
		</div>
	)
}
