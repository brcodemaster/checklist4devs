import * as jwtLib from 'jsonwebtoken'
import { NextRequest } from 'next/server'

import { TJwtPayload } from '@/shared/types/default-types'

import { ApiError, BASE_ERRORS } from '../errors'

export class JwtService {
	constructor(private readonly jwt: typeof jwtLib) {}

	private getSecretKey(): string {
		const secretKey = process.env.JWT_SECRET_KEY

		if (!secretKey) throw new Error('Secret key is not found')

		return secretKey
	}

	verify(token: string): boolean {
		try {
			this.jwt.verify(token, this.getSecretKey())

			return true
		} catch (err: any) {
			if (err.name === 'TokenExpiredError') {
				return false
			}

			throw new ApiError(BASE_ERRORS.InvalidTokenError, 'Token is invalid')
		}
	}

	sign(payload: TJwtPayload, type: 'accessToken' | 'refreshToken') {
		const expiresIn = type === 'accessToken' ? '1h' : '30d'

		return this.jwt.sign(payload, this.getSecretKey(), { expiresIn })
	}

	decode(token: string): TJwtPayload {
		return this.jwt.decode(token) as TJwtPayload
	}

	getAccessTokenFromRequest(request: NextRequest): string {
		const token = request.cookies.get('x-access-token')?.value

		if (!token) throw new ApiError(BASE_ERRORS.Unauthorized, 'User not authorized')

		return token
	}
}

const jwtService = new JwtService(jwtLib)
type TJwtService = typeof jwtService

export { jwtService, type TJwtService }
