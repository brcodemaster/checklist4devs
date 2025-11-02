import { Prisma, PrismaClient } from '@/generated/client'
import { prisma } from '@/prisma-client'

import { ApiError, BASE_ERRORS } from '../errors'

export class GroupService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById(id: string) {
		const group = await this.prisma.group.findUnique({
			where: {
				id
			}
		})

		if (!group)
			throw new ApiError(BASE_ERRORS.NotFound, `Group with  this ID: #${id} is not found`)

		return group
	}

	async findMine() {}

	async findOne<T extends Prisma.GroupFindUniqueArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupFindUniqueArgs>
	): Promise<Prisma.GroupGetPayload<T> | null> {
		const params = args ? { ...args, where: { id } } : { where: { id } }
		return (await this.prisma.group.findUnique(
			params as any
		)) as Prisma.GroupGetPayload<T> | null
	}

	async findAll<T extends Prisma.GroupFindManyArgs>(
		args?: Prisma.SelectSubset<T, Prisma.GroupFindManyArgs>
	): Promise<Prisma.GroupGetPayload<T>[]> {
		return await this.prisma.group.findMany(args)
	}

	async delete() {}

	async create() {}

	async update() {}
}

const groupService = new GroupService(prisma)
type TGroupService = typeof groupService

export { groupService, type TGroupService }
