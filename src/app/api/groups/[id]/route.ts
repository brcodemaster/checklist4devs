import { groupService } from '@/shared/lib/services/group-service'

export async function GET() {
	const groups = groupService.findOne('2', { include: { creator: true } })

	const as = groupService.findAll({ include: { creator: true } })
}
