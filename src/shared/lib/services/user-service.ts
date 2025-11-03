import { Prisma, PrismaClient } from '@/generated/client'
import { prisma } from '@/prisma-client'

import { ApiError, BASE_ERRORS } from '../errors'

export class UserService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById<T extends Prisma.UserDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.UserDefaultArgs>
	): Promise<Prisma.UserGetPayload<T>> {
		const params: Prisma.UserDefaultArgs = args ?? {}

		const user = await this.prisma.user.findUnique({
			where: { id },
			...params
		})

		if (!user)
			throw new ApiError(BASE_ERRORS.NotFound, `User with this ID: #${id} is not found`)

		return user as Prisma.UserGetPayload<T>
	}

	async findOne<T extends Prisma.UserDefaultArgs>(
		email: string,
		args?: Prisma.SelectSubset<T, Prisma.UserDefaultArgs>
	): Promise<Prisma.UserGetPayload<T> | null> {
		const params: Prisma.UserDefaultArgs = args ?? {}

		return this.prisma.user.findUnique({
			where: { email },
			...params
		}) as unknown as Prisma.UserGetPayload<T> | null
	}

	async findAll<T extends Prisma.UserFindManyArgs>(
		args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
	): Promise<Prisma.UserGetPayload<T>[]> {
		return await this.prisma.user.findMany(args)
	}

	async delete<T extends Prisma.UserDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.UserDefaultArgs>
	): Promise<Prisma.UserGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.user.delete({
			where: {
				id
			},
			...params
		})) as Prisma.UserGetPayload<T>
	}

	async create<T extends Prisma.UserDefaultArgs>(
		payload: Prisma.UserUncheckedCreateInput,
		args?: Prisma.SelectSubset<T, Prisma.UserDefaultArgs>
	): Promise<Prisma.UserGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.user.create({
			data: payload,
			...params
		})) as Prisma.UserGetPayload<T>
	}

	async update<T extends Prisma.UserDefaultArgs>(
		id: string,
		payload: Prisma.UserUncheckedUpdateInput,
		args?: Prisma.SelectSubset<T, Prisma.UserDefaultArgs>
	): Promise<Prisma.UserGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.user.update({
			where: {
				id
			},
			data: { ...payload, id },
			...params
		})) as Prisma.UserGetPayload<T>
	}
}

const userService = new UserService(prisma)
type TUserService = typeof userService

export { userService, type TUserService }
