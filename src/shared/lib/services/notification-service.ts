import { Notification, Prisma, PrismaClient } from '@/generated/client'
import { prisma } from '@/prisma-client'

import { ApiError, BASE_ERRORS } from '../errors'

export class NotificationService {
	constructor(private readonly prisma: PrismaClient) {}

	async findById<T extends Prisma.NotificationDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.NotificationDefaultArgs>
	): Promise<Prisma.NotificationGetPayload<T>> {
		const params: Prisma.NotificationDefaultArgs = args ?? {}

		const notification = await this.prisma.notification.findUnique({
			where: { id },
			...params
		})

		if (!notification)
			throw new ApiError(
				BASE_ERRORS.NotFound,
				`Notification with this ID: #${id} is not found`
			)

		return notification as Prisma.NotificationGetPayload<T>
	}

	async findMine<T extends Prisma.NotificationFindManyArgs>(
		userId: string,
		args?: Prisma.SelectSubset<T, Prisma.NotificationFindManyArgs>
	): Promise<Prisma.NotificationGetPayload<T>[]> {
		const params = args ?? {}

		return (await prisma.notification.findMany({
			where: {
				userId
			},
			...params
		})) as Prisma.NotificationGetPayload<T>[]
	}

	async findOne<T extends Prisma.NotificationDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.NotificationDefaultArgs>
	): Promise<Prisma.NotificationGetPayload<T> | null> {
		const params: Prisma.NotificationDefaultArgs = args ?? {}

		return this.prisma.notification.findUnique({
			where: { id },
			...params
		}) as unknown as Prisma.NotificationGetPayload<T> | null
	}

	async findAll<T extends Prisma.NotificationFindManyArgs>(
		args?: Prisma.SelectSubset<T, Prisma.NotificationFindManyArgs>
	): Promise<Prisma.NotificationGetPayload<T>[]> {
		return await this.prisma.notification.findMany(args)
	}

	async delete<T extends Prisma.NotificationDefaultArgs>(
		id: string,
		args?: Prisma.SelectSubset<T, Prisma.NotificationDefaultArgs>
	): Promise<Prisma.NotificationGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.notification.delete({
			where: {
				id
			},
			...params
		})) as Prisma.NotificationGetPayload<T>
	}

	async create<T extends Prisma.NotificationDefaultArgs>(
		payload: Prisma.NotificationUncheckedCreateInput,
		args?: Prisma.SelectSubset<T, Prisma.NotificationDefaultArgs>
	): Promise<Prisma.NotificationGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.notification.create({
			data: payload,
			...params
		})) as Prisma.NotificationGetPayload<T>
	}

	async update<T extends Prisma.NotificationDefaultArgs>(
		id: string,
		payload: Prisma.NotificationUncheckedUpdateInput,
		args?: Prisma.SelectSubset<T, Prisma.NotificationDefaultArgs>
	): Promise<Prisma.NotificationGetPayload<T>> {
		const params = args ?? {}

		return (await prisma.notification.update({
			where: {
				id
			},
			data: { ...payload, id },
			...params
		})) as Prisma.NotificationGetPayload<T>
	}

	async send<T extends Prisma.NotificationDefaultArgs>(
		email: string,
		message: string,
		args?: Prisma.SelectSubset<T, Prisma.NotificationDefaultArgs>
	): Promise<Prisma.NotificationGetPayload<T>> {
		const params = args ?? {}

		if (email !== 'bekzodrn@mail.ru')
			throw new ApiError(BASE_ERRORS.Forbidden, `The path is locked for you`)

		const newNotification = {
			title: 'Message from creator of Checklist4devs',
			description: message,
			isPublic: true
		} as Notification

		return (await prisma.notification.create({
			data: { ...newNotification },
			...params
		})) as Prisma.NotificationGetPayload<T>
	}
}

const notificationService = new NotificationService(prisma)
type TNotificationService = typeof notificationService

export { notificationService, type TNotificationService }
