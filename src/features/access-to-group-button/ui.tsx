'use client'

import { Button } from '@/shared/ui'

import { useAccessToGroupButton } from './model'

export const AccessToGroupButton: React.FC<{ groupId: string | null; notId: string }> = ({
	groupId,
	notId
}) => {
	const { handleClick } = useAccessToGroupButton(groupId, notId)

	return <Button onClick={handleClick}>Access</Button>
}
