import { Prisma, PrismaClient } from '@/generated/client'
import { prisma } from '@/prisma-client'

import { ApiError, BASE_ERRORS } from '../errors'

export class TaskService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById<T extends Prisma.TaskDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.TaskDefaultArgs>
	): Promise<Prisma.TaskGetPayload<T>> {
		const params: Prisma.TaskDefaultArgs = args ?? {}

		const task = await this.prisma.task.findUnique({
			where: { id },
			...params
		})

		if (!task)
			throw new ApiError(BASE_ERRORS.NotFound, `Task with this ID: #${id} is not found`)

		return task as Prisma.TaskGetPayload<T>
	}

	async findMine<T extends Prisma.TaskFindManyArgs>(
		userId: string,
		args?: Prisma.SelectSubset<T, Prisma.TaskFindManyArgs>
	): Promise<Prisma.TaskGetPayload<T>[]> {
		const params = args ?? {}

		return (await prisma.task.findMany({
			where: {
				OR: [{ creatorId: userId }, { assignerId: userId }]
			},
			...params
		})) as Prisma.TaskGetPayload<T>[]
	}

	async findOne<T extends Prisma.TaskDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.TaskDefaultArgs>
	): Promise<Prisma.TaskGetPayload<T> | null> {
		const params: Prisma.TaskDefaultArgs = args ?? {}

		return this.prisma.task.findUnique({
			where: { id },
			...params
		}) as unknown as Prisma.TaskGetPayload<T> | null
	}

	async findAll<T extends Prisma.TaskFindManyArgs>(
		args?: Prisma.SelectSubset<T, Prisma.TaskFindManyArgs>
	): Promise<Prisma.TaskGetPayload<T>[]> {
		return await this.prisma.task.findMany(args)
	}

	async delete<T extends Prisma.TaskDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.TaskDefaultArgs>
	): Promise<Prisma.TaskGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.task.delete({
			where: {
				id
			},
			...params
		})) as Prisma.TaskGetPayload<T>
	}

	async create<T extends Prisma.TaskDefaultArgs>(
		payload: Prisma.TaskUncheckedCreateInput,
		args?: Prisma.SelectSubset<T, Prisma.TaskDefaultArgs>
	): Promise<Prisma.TaskGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.task.create({
			data: payload,
			...params
		})) as Prisma.TaskGetPayload<T>
	}

	async update<T extends Prisma.TaskDefaultArgs>(
		id: string,
		payload: Prisma.TaskUncheckedUpdateInput,
		args?: Prisma.SelectSubset<T, Prisma.TaskDefaultArgs>
	): Promise<Prisma.TaskGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.task.update({
			where: {
				id
			},
			data: { ...payload, id },
			...params
		})) as Prisma.TaskGetPayload<T>
	}
}

const taskService = new TaskService(prisma)
type TTaskService = typeof taskService

export { taskService, type TTaskService }
