import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { kyInstance } from '@/shared/lib/ky-instance'

import { Prisma, Project } from '@/generated/client'

export const useCreateProject = () => {
	const queryClient = useQueryClient()

	const { mutateAsync: handleCreate } = useMutation({
		mutationFn: async (payload: Prisma.ProjectUncheckedCreateInput) =>
			await kyInstance.post('projects/create', { json: payload }).json<Project>(),
		onMutate: async (payload: Prisma.ProjectUncheckedCreateInput) => {
			await queryClient.cancelQueries({ queryKey: ['projects'] })

			const previousProjects = queryClient.getQueryData(['projects'])

			await queryClient.setQueryData(['projects'], (old: Project[] | undefined) => {
				if (!old) return { previousProjects }

				const now = new Date()

				const newProject = {
					id: crypto.randomUUID(),
					name: payload.name,
					createdAt: now,
					updatedAt: now,
					creatorId: payload.creatorId,
					links: payload.links,
					groupId: payload.groupId,
					status: payload.status,
					password: payload.password,
					type: payload.type
				} as Project

				return [...old, newProject]
			})

			return { previousProjects }
		},
		onError: async (err, _, context) => {
			if (context?.previousProjects) {
				await queryClient.setQueryData(['projects'], context?.previousProjects)
			}

			toast.error('Failed to create the project. Please try again.')
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['projects'] })

			toast.success('Group created successfully.')
		}
	})

	return { handleCreate }
}
