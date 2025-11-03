import { compare, hash } from 'bcrypt'
import { NextRequest } from 'next/server'

import { TJwtService, jwtService } from './jwt-service'
import { TUserService, userService } from './user-service'
import { Prisma, User } from '@/generated/client'

import { ApiError, BASE_ERRORS } from '../errors'

export class AuthService {
	constructor(
		private readonly jwtService: TJwtService,
		private readonly userService: TUserService
	) {}

	async me(request: NextRequest): Promise<User> {
		const token = this.jwtService.getAccessTokenFromRequest(request)

		const isValidToken = this.jwtService.verify(token)

		if (!isValidToken) {
			const { id } = await this.refreshToken(token)

			return await this.userService.findById(id)
		}

		const { userId } = this.jwtService.decode(token)

		return await this.userService.findById(userId)
	}

	async login(
		payload: Pick<User, 'email' | 'password'>
	): Promise<
		Omit<User, 'accessToken' | 'refreshToken'> & { accessToken: string; refreshToken: string }
	> {
		const { email, password } = payload

		const user = await userService.findOne(email)

		if (!user) throw new ApiError(BASE_ERRORS.BadRequest, 'Invalid email or password')

		const isValidPassword = await compare(password, user.password)

		if (!isValidPassword)
			throw new ApiError(BASE_ERRORS.BadRequest, 'Invalid email or password')

		const accessToken = this.jwtService.sign(
			{ userId: user.id, sub: `user-${user.email}`, jti: crypto.randomUUID() },
			'accessToken'
		)

		const refreshToken = this.jwtService.sign(
			{ userId: user.id, sub: `user-${user.email}`, jti: crypto.randomUUID() },
			'refreshToken'
		)

		const updatedUser = await userService.update(user.id, { accessToken, refreshToken })

		return { ...updatedUser, accessToken, refreshToken }
	}

	async logout(payload: Pick<User, 'id'>): Promise<User> {
		const { id } = payload

		return await this.userService.update(id, { accessToken: null })
	}

	async register(
		payload: Omit<Prisma.UserUncheckedCreateInput, 'id'>
	): Promise<Omit<User, 'refreshToken'> & { refreshToken: string }> {
		const user = await this.userService.findOne(payload.email)

		if (user) throw new ApiError(BASE_ERRORS.Conflict, 'User with this email is already exists')

		const hashedPassword = await hash(payload.password, 10)

		const newUser = await this.userService.create({ ...payload, password: hashedPassword })

		const refreshToken = this.jwtService.sign(
			{ userId: newUser.id, sub: `user-${newUser.email}`, jti: crypto.randomUUID() },
			'refreshToken'
		)

		const updatedUser = await this.userService.update(newUser.id, { refreshToken })

		return { ...updatedUser, refreshToken }
	}

	async refreshToken(token: string): Promise<User> {
		const { userId } = this.jwtService.decode(token)

		const user = await this.userService.findById(userId)

		const accessToken = this.jwtService.sign(
			{ userId: user.id, sub: `user-${user.email}`, jti: crypto.randomUUID() },
			'accessToken'
		)

		const refreshToken = this.jwtService.sign(
			{ userId: user.id, sub: `user-${user.email}`, jti: crypto.randomUUID() },
			'refreshToken'
		)

		const updatedUser = await userService.update(user.id, { accessToken, refreshToken })

		return updatedUser
	}
}

const authService = new AuthService(jwtService, userService)
type TAuthService = typeof authService

export { authService, type TAuthService }
