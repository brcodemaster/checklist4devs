import { Prisma, PrismaClient } from '@/generated/client'
import { prisma } from '@/prisma-client'

import { ApiError, BASE_ERRORS } from '../errors'

export class GroupService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById<T extends Prisma.GroupDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params: Prisma.GroupDefaultArgs = args ?? {}

		const group = await this.prisma.group.findUnique({
			where: { id },
			...params
		})

		if (!group)
			throw new ApiError(BASE_ERRORS.NotFound, `Group with this ID: #${id} is not found`)

		return group as Prisma.GroupGetPayload<T>
	}

	async findMine<T extends Prisma.GroupFindManyArgs>(
		userId: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupFindManyArgs>
	): Promise<Prisma.GroupGetPayload<T>[]> {
		const params = args ?? {}

		return (await prisma.group.findMany({
			where: {
				OR: [
					{ creatorId: userId },
					{
						developers: {
							some: {
								id: userId
							}
						}
					}
				]
			},
			...params
		})) as Prisma.GroupGetPayload<T>[]
	}

	async findOne<T extends Prisma.GroupDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T> | null> {
		const params: Prisma.GroupDefaultArgs = args ?? {}

		return this.prisma.group.findUnique({
			where: { id },
			...params
		}) as unknown as Prisma.GroupGetPayload<T> | null
	}

	async findAll<T extends Prisma.GroupFindManyArgs>(
		args?: Prisma.SelectSubset<T, Prisma.GroupFindManyArgs>
	): Promise<Prisma.GroupGetPayload<T>[]> {
		return await this.prisma.group.findMany(args)
	}

	async delete<T extends Prisma.GroupDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.group.delete({
			where: {
				id
			},
			...params
		})) as Prisma.GroupGetPayload<T>
	}

	async create<T extends Prisma.GroupDefaultArgs>(
		payload: Prisma.GroupUncheckedCreateInput,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.group.create({
			data: payload,
			...params
		})) as Prisma.GroupGetPayload<T>
	}

	async update<T extends Prisma.GroupDefaultArgs>(
		id: string,
		payload: Prisma.GroupUncheckedUpdateInput,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.group.update({
			where: {
				id
			},
			data: { ...payload, id },
			...params
		})) as Prisma.GroupGetPayload<T>
	}
}

const groupService = new GroupService(prisma)
type TGroupService = typeof groupService

export { groupService, type TGroupService }
