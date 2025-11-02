import { Check, Pause, Settings, X } from 'lucide-react'

import { ProjectStatus } from '@/generated/enums'

export const getProjectStatus = (status: ProjectStatus) => {
	if (status === 'CANCELED')
		return {
			status,
			text: 'Project is canceled',
			icon: X
		}

	if (status === 'COMPLETED')
		return {
			status,
			text: 'Project is completed',
			icon: Check
		}

	if (status === 'IN_DEVELOPMENT')
		return {
			status,
			text: 'Project is in development',
			icon: Settings
		}

	return {
		status,
		text: 'Project is paused',
		icon: Pause
	}
}
