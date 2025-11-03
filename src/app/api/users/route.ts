import { ApiResponse, ErrorApiResponse } from '@/shared/lib'
import { userService } from '@/shared/lib/services/user-service'

export async function GET() {
	try {
		const users = await userService.findAll({
			include: {
				groups: { select: { id: true, name: true } }
			}
		})

		return ApiResponse(users, 'Users returned successfully')
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
