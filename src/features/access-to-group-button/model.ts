import { useMutation } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { kyInstance } from '@/shared/api'
import { useAuth } from '@/shared/contexts/auth-context'
import { TApiResponse } from '@/shared/types/default-types'

import { Group } from '@/generated/client'

const INVITE_KEY = process.env.NEXT_PUBLIC_INVITE_KEY || ''

export const useAccessToGroupButton = (groupId: string | null, notId: string) => {
	const { user } = useAuth()

	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationFn: async (_payload: { toastId: string | number }) => {
			const json = {
				inviteKey: INVITE_KEY,
				userId: user?.id,
				notId,
				groupId
			}

			const res = await kyInstance
				.post('groups/add-member', {
					json
				})
				.json<TApiResponse<Group>>()

			return res.data
		},
		onSuccess: (_, variables) => {
			router.push(`/groups/${groupId}`)

			return toast.success('Member added to group', { id: variables.toastId })
		},
		onError: async (err, variables) => {
			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: variables.toastId })
				}
			}

			return toast.error('Something went wrong', { id: variables.toastId })
		}
	})

	const handleClick = async () => {
		const toastId = toast.loading('Adding member to group')

		mutateAsync({ toastId })
	}

	return { handleClick }
}
