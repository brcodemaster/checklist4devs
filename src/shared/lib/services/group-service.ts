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
		userId: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params = args ?? {}

		const { admins: oldAdmins } = await this.findById(id)

		const isAdmin = oldAdmins.some(oldAdmin => oldAdmin === userId)

		if (!isAdmin) throw new ApiError(BASE_ERRORS.BadRequest, 'Only admins can delete the group')

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
			data: {
				...payload,
				developers: {
					connect: {
						id: payload.creatorId
					}
				},
				admins: [payload.creatorId]
			},
			...params
		})) as Prisma.GroupGetPayload<T>
	}

	async update<T extends Prisma.GroupDefaultArgs>(
		id: string,
		payload: Prisma.GroupUncheckedUpdateInput,
		userId: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params = args ?? {}

		const newAdmins = (payload.admins ?? []) as string[]

		const { admins: oldAdmins } = await this.findById(id)

		const isAdmin = oldAdmins.some(oldAdmin => oldAdmin === userId)

		if (!isAdmin) throw new ApiError(BASE_ERRORS.BadRequest, 'Only admins can update the group')

		const adminIds = Array.from(new Set([...oldAdmins, ...newAdmins]))

		return (await prisma.group.update({
			where: {
				id
			},
			data: { ...payload, admins: adminIds, id },
			...params
		})) as Prisma.GroupGetPayload<T>
	}

	async addMember<T extends Prisma.GroupDefaultArgs>(
		id: string,
		userId: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params = args ?? {}

		const group = await this.findById(id)

		return (await prisma.group.update({
			where: {
				id: group.id
			},
			data: { developers: { connect: { id: userId } } },
			...params
		})) as Prisma.GroupGetPayload<T>
	}

	async kick<T extends Prisma.GroupDefaultArgs>(
		userId: string,
		groupId: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params = args ?? {}

		const group = await this.findById(groupId, { include: { developers: true } })

		const admins = group.admins.filter(admin => admin !== userId)
		const developers = group.developers.filter(developer => developer.id !== userId)

		return (await prisma.group.update({
			where: {
				id: groupId
			},
			data: {
				developers: {
					set: developers
				},
				admins: [...admins]
			},
			...params
		})) as Prisma.GroupGetPayload<T>
	}

	async demoteToRegular<T extends Prisma.GroupDefaultArgs>(
		userId: string,
		groupId: string,
		args?: Prisma.SelectSubset<T, Prisma.GroupDefaultArgs>
	): Promise<Prisma.GroupGetPayload<T>> {
		const params = args ?? {}

		const { admins } = await this.findById(groupId, { include: { developers: true } })

		return (await prisma.group.update({
			where: {
				id: groupId
			},
			data: {
				admins: admins.filter(admin => admin !== userId)
			},
			...params
		})) as Prisma.GroupGetPayload<T>
	}
}

const groupService = new GroupService(prisma)
type TGroupService = typeof groupService

export { groupService, type TGroupService }
