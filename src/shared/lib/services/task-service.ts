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

		const project = await prisma.project.findUnique({
			where: {
				id: payload.projectId
			},
			include: { group: { include: { developers: { include: { user: true } } } } }
		})

		if (!project)
			throw new ApiError(
				BASE_ERRORS.NotFound,
				`Project with this ID: #${payload.projectId} is not found`
			)

		const developers = project.group.developers.map(({ user }) => user)

		const isCreatorHasIsGroup = developers.some(developer => developer.id === payload.creatorId)

		if (!isCreatorHasIsGroup)
			throw new ApiError(
				BASE_ERRORS.BadRequest,
				'Only project members are allowed to create tasks'
			)

		return (await prisma.task.create({
			data: payload,
			...params
		})) as Prisma.TaskGetPayload<T>
	}

	async update<T extends Prisma.TaskDefaultArgs>(
		id: string,
		payload: Prisma.TaskUncheckedUpdateInput,
		userId?: string,
		args?: Prisma.SelectSubset<T, Prisma.TaskDefaultArgs>
	): Promise<Prisma.TaskGetPayload<T>> {
		const params = args ?? {}

		const task = await prisma.task.findUnique({
			where: {
				id
			},
			include: {
				project: {
					include: { group: { include: { developers: { include: { user: true } } } } }
				}
			}
		})

		if (!userId)
			throw new ApiError(
				BASE_ERRORS.BadRequest,
				`Something went wrongSyntaxError: Unexpected end of JSON input`
			)

		const developers = task?.project.group.developers.map(({ user }) => user)

		const isMemberHasInGroup = developers?.some(developer => developer.id === userId)

		if (!task)
			throw new ApiError(BASE_ERRORS.NotFound, `Task with this ID: #${id} is not found`)

		if (!isMemberHasInGroup)
			throw new ApiError(
				BASE_ERRORS.BadRequest,
				'Only group members are allowed to update tasks'
			)

		if (task.status !== 'IN_PROGRESS')
			throw new ApiError(BASE_ERRORS.NotFound, `You can update tasks that are in progress`)

		return (await prisma.task.update({
			where: {
				id
			},
			data: { ...payload, id },
			...params
		})) as Prisma.TaskGetPayload<T>
	}

	async updateStatus<T extends Prisma.TaskDefaultArgs>(
		id: string,
		payload: Prisma.TaskUncheckedUpdateInput,
		args?: Prisma.SelectSubset<T, Prisma.TaskDefaultArgs>
	): Promise<Prisma.TaskGetPayload<T>> {
		const params = args ?? {}

		const task = await prisma.task.findUnique({
			where: {
				id
			}
		})

		if (!task)
			throw new ApiError(BASE_ERRORS.NotFound, `Task with this ID: #${id} is not found`)

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
