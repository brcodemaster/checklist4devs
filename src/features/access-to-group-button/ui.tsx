'use client'

import { Button } from '@/shared/ui'

import { useAccessToGroupButton } from './model'

export const AccessToGroupButton: React.FC<{ groupId: string | null }> = ({ groupId }) => {
	const { handleClick } = useAccessToGroupButton(groupId)

	return <Button onClick={handleClick}>Access</Button>
}
