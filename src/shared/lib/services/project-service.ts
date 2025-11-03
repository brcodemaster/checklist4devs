import { Prisma, PrismaClient } from '@/generated/client'
import { prisma } from '@/prisma-client'

import { ApiError, BASE_ERRORS } from '../errors'

export class ProjectService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById<T extends Prisma.ProjectDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.ProjectDefaultArgs>
	): Promise<Prisma.ProjectGetPayload<T>> {
		const params: Prisma.ProjectDefaultArgs = args ?? {}

		const project = await this.prisma.project.findUnique({
			where: { id },
			...params
		})

		if (!project)
			throw new ApiError(BASE_ERRORS.NotFound, `Project with this ID: #${id} is not found`)

		return project as Prisma.ProjectGetPayload<T>
	}

	async findMine<T extends Prisma.ProjectFindManyArgs>(
		userId: string,
		args?: Prisma.SelectSubset<T, Prisma.ProjectFindManyArgs>
	): Promise<Prisma.ProjectGetPayload<T>[]> {
		const params = args ?? {}

		return (await prisma.project.findMany({
			where: {
				OR: [
					{ creatorId: userId },
					{
						group: {
							developers: {
								some: {
									id: userId
								}
							}
						}
					}
				]
			},
			...params
		})) as Prisma.ProjectGetPayload<T>[]
	}

	async findOne<T extends Prisma.ProjectDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.ProjectDefaultArgs>
	): Promise<Prisma.ProjectGetPayload<T> | null> {
		const params: Prisma.ProjectDefaultArgs = args ?? {}

		return this.prisma.project.findUnique({
			where: { id },
			...params
		}) as unknown as Prisma.ProjectGetPayload<T> | null
	}

	async findAll<T extends Prisma.ProjectFindManyArgs>(
		args?: Prisma.SelectSubset<T, Prisma.ProjectFindManyArgs>
	): Promise<Prisma.ProjectGetPayload<T>[]> {
		return await this.prisma.project.findMany(args)
	}

	async delete<T extends Prisma.ProjectDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.ProjectDefaultArgs>
	): Promise<Prisma.ProjectGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.project.delete({
			where: {
				id
			},
			...params
		})) as Prisma.ProjectGetPayload<T>
	}

	async create<T extends Prisma.ProjectDefaultArgs>(
		payload: Prisma.ProjectUncheckedCreateInput,
		args?: Prisma.SelectSubset<T, Prisma.ProjectDefaultArgs>
	): Promise<Prisma.ProjectGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.project.create({
			data: payload,
			...params
		})) as Prisma.ProjectGetPayload<T>
	}

	async update<T extends Prisma.ProjectDefaultArgs>(
		id: string,
		payload: Prisma.ProjectUncheckedUpdateInput,
		args?: Prisma.SelectSubset<T, Prisma.ProjectDefaultArgs>
	): Promise<Prisma.ProjectGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.project.update({
			where: {
				id
			},
			data: { ...payload, id },
			...params
		})) as Prisma.ProjectGetPayload<T>
	}
}

const projectService = new ProjectService(prisma)
type TProjectService = typeof projectService

export { projectService, type TProjectService }
