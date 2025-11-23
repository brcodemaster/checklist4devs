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

	async me(request: NextRequest): Promise<
		Prisma.UserGetPayload<{
			include: { groups: { include: { group: { select: { id: true; name: true } } } } }
		}>
	> {
		const token = this.jwtService.getAccessTokenFromRequest(request)

		const { userId } = this.jwtService.decode(token)
		const isValidToken = this.jwtService.verify(token)

		if (!isValidToken) {
			return await this.refreshToken(userId)
		}

		return await this.userService.findById(userId, {
			include: { groups: { include: { group: { select: { name: true, id: true } } } } }
		})
	}

	async login(
		payload: Pick<User, 'email' | 'password'>
	): Promise<Omit<User, 'accessToken'> & { accessToken: string }> {
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

		const updatedUser = await userService.update(
			user.id,
			{ accessToken, refreshToken },
			{ include: { groups: { include: { group: { select: { id: true, name: true } } } } } }
		)

		return { ...updatedUser, accessToken }
	}

	async logout(payload: Pick<User, 'id'>): Promise<User> {
		const { id } = payload

		return await this.userService.update(id, { accessToken: null, refreshToken: null })
	}

	async register(payload: Omit<Prisma.UserUncheckedCreateInput, 'id'>): Promise<User> {
		const user = await this.userService.findOne(payload.email)

		if (user) throw new ApiError(BASE_ERRORS.Conflict, 'User with this email is already exists')

		const hashedPassword = await hash(payload.password, 10)

		const newUser = await this.userService.create({ ...payload, password: hashedPassword })

		return newUser
	}

	async refreshToken(userId: string): Promise<
		Omit<
			Prisma.UserGetPayload<{
				include: { groups: { include: { group: { select: { id: true; name: true } } } } }
			}>,
			'accessToken'
		> & { accessToken: string }
	> {
		const user = await this.userService.findById(userId)

		if (!user.refreshToken)
			throw new ApiError(BASE_ERRORS.Unauthorized, `User not authenticated`)

		const isValidRefresh = jwtService.verify(user.refreshToken)

		if (!isValidRefresh) throw new ApiError(BASE_ERRORS.Unauthorized, `User not authenticated`)

		const accessToken = this.jwtService.sign(
			{ userId: user.id, sub: `user-${user.email}`, jti: crypto.randomUUID() },
			'accessToken'
		)

		const updatedUser = await userService.update(
			user.id,
			{ accessToken },
			{ include: { groups: { include: { group: { select: { id: true, name: true } } } } } }
		)

		return { ...updatedUser, accessToken }
	}

	async checkAuth(request: NextRequest) {
		return await this.me(request)
	}
}

const authService = new AuthService(jwtService, userService)
type TAuthService = typeof authService

export { authService, type TAuthService }
