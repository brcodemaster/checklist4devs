import { JwtPayload } from 'jsonwebtoken'

import { Prisma, Project } from '@/generated/client'

import { PROJECT_STATUS, PROJECT_TYPE, TASK_STATUS } from '../constants'

export type TApiResponse<T = unknown> = {
	success: boolean
	message: string
	data: T
}

export type TJwtPayload = {
	userId: string
} & JwtPayload

export type TSafeUser = Omit<
	Prisma.UserGetPayload<{
		include: { groups: { include: { group: { select: { id: true; name: true } } } } }
	}>,
	'accessToken' | 'refreshToken' | 'password'
>

export type TMetaProjects = Project & { creatorName: string; groupName: string }

export type TTaskUpdate = { id: string } & Omit<Prisma.TaskUncheckedUpdateInput, 'id'>

export type ProjectType = (typeof PROJECT_TYPE)[number]

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS]

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
