import { JwtPayload } from 'jsonwebtoken'

import { Group, Prisma, Project, User } from '@/generated/client'

export type TApiResponse<T = unknown> = {
	success: boolean
	message: string
	data: T
}

export type TJwtPayload = {
	userId: string
} & JwtPayload

export type TSafeUser = Omit<User, 'accessToken' | 'refreshToken' | 'password'> & {
	groups: Group[]
}

export type TMetaProjects = Project & { creatorName: string; groupName: string }

export type TTaskUpdate = { id: string } & Omit<Prisma.TaskUncheckedUpdateInput, 'id'>
