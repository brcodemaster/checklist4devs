import { JwtPayload } from 'jsonwebtoken'

export type TApiResponse<T = unknown> = {
	success: boolean
	message: string
	data: T
}

export type TJwtPayload = {
	userId: string
} & JwtPayload
