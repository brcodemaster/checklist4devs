import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { kyInstance } from '@/shared/lib/ky-instance'

import { Group, Prisma } from '@/generated/client'

export const useCreateGroup = () => {
	const queryClient = useQueryClient()

	const { mutateAsync: handleCreate } = useMutation({
		mutationFn: async (payload: Prisma.GroupUncheckedCreateInput) =>
			await kyInstance.post('groups/create', { json: payload }).json<Group>(),
		onMutate: async (payload: Prisma.GroupUncheckedCreateInput) => {
			await queryClient.cancelQueries({ queryKey: ['groups'] })

			const previousGroups = queryClient.getQueryData<Group[]>(['groups'])

			await queryClient.setQueryData(['groups'], (old: Group[] | undefined) => {
				if (!old) return { previousGroups }

				const now = new Date()

				const group = {
					id: crypto.randomUUID(),
					name: payload.name,
					slug: payload.slug,
					password: payload.password,
					creatorId: payload.creatorId,
					createdAt: now,
					updatedAt: now
				}

				return [...old, group]
			})

			return { previousGroups }
		},
		onError: async (err, _, context) => {
			if (context?.previousGroups) {
				await queryClient.setQueryData(['groups'], context.previousGroups)
			}

			toast.error('Failed to create the group. Please try again.')
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['groups'] })

			toast.success('Group created successfully.')
		}
	})

	return { handleCreate }
}
