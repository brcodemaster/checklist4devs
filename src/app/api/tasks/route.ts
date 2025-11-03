import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { taskService } from '@/shared/lib/services/task-service'
import { userService } from '@/shared/lib/services/user-service'

export async function GET() {
	try {
		const tasks = await taskService.findAll()

		const creatorIds = tasks.map(task => task.creatorId)
		const assignerIds = tasks.map(task => task.assignerId)

		const creators = await userService.findAll({
			where: {
				id: { in: creatorIds }
			},
			select: {
				id: true,
				userName: true
			}
		})

		const assigners = await userService.findAll({
			where: {
				id: { in: assignerIds }
			},
			select: {
				id: true,
				userName: true
			}
		})

		const creatorsObject = Object.fromEntries(
			creators.map(creator => [creator.id, creator.userName])
		)

		const assignersObject = Object.fromEntries(
			creators.map(creator => [creator.id, creator.userName])
		)

		const metaTasks = tasks.map(task => ({
			...task,
			creatorName: creatorsObject[task.creatorId],
			assignerName: assignersObject[task.assignerId]
		}))

		return ApiResponse(metaTasks, 'Tasks returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
