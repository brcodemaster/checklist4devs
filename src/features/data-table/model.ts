import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { kyInstance } from '@/shared/api'
import { useAuth } from '@/shared/contexts/auth-context'
import { TApiResponse } from '@/shared/types/default-types'

import { Group, Prisma } from '@/generated/client'

export const useDataTable = () => {
	const queryClient = useQueryClient()
	const { user } = useAuth()
	const { id: groupId } = useParams<{ id: string }>()

	const router = useRouter()

	const { mutateAsync: mutateAsyncKick } = useMutation({
		mutationFn: async (userId: string) => {
			const res = await kyInstance
				.patch('groups/kick', { json: { userId, groupId } })
				.json<TApiResponse<Group>>()

			return res.data
		},
		onMutate: async (userId: string) => {
			await queryClient.cancelQueries({ queryKey: ['group', groupId] })

			const previousGroup = queryClient.getQueryData<
				Prisma.GroupGetPayload<{ include: { developers: true; projects: true } }>
			>(['group', groupId])

			const newGroup = queryClient.setQueryData<
				Prisma.GroupGetPayload<{ include: { developers: true; projects: true } }>
			>(['group', groupId], old => {
				if (!old) return old

				const developers = old.developers.filter(developer => developer.id !== userId)

				return { ...old, developers }
			})

			const toastText = user?.id === userId ? 'Leaving group...' : 'Kicking member...'

			const toastId = toast.loading(toastText)

			return {
				previousGroup,
				toastId,
				isCreatorLeaving: user?.id === userId,
				users: newGroup?.developers
			}
		},
		onSuccess: async (_, __, context) => {
			await queryClient.invalidateQueries({
				queryKey: ['group', groupId]
			})

			toast.success(
				context.isCreatorLeaving
					? 'Group leaved successfully'
					: 'Member kicked successfully',
				{ id: context.toastId }
			)

			router.refresh()
		},
		onError: async (err, _, context) => {
			if (context?.previousGroup) {
				queryClient.setQueryData(['group', groupId], () => context.previousGroup)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message)
				}
			}

			return toast.error('Something went wrong', { id: context?.toastId })
		}
	})

	const { mutateAsync: mutateAsyncUpdateToAdmin } = useMutation({
		mutationFn: async ({ userId }: { userId: string; userName: string }) => {
			const json = {
				id: groupId,
				payload: {
					admin: userId
				}
			}

			const res = await kyInstance
				.patch('groups/update', { json })
				.json<TApiResponse<Group>>()

			return res.data
		},
		onMutate: async ({ userId, userName }: { userId: string; userName: string }) => {
			await queryClient.cancelQueries({ queryKey: ['group', groupId] })

			const previousGroup = queryClient.getQueryData<
				Prisma.GroupGetPayload<{
					include: { developers: true; projects: true }
				}>
			>(['group', groupId])

			queryClient.setQueryData(
				['group', groupId],
				(
					old: Prisma.GroupGetPayload<{
						include: { developers: true; projects: true }
					}>
				) => {
					if (!old) return old

					const updatedGroup = {
						...old,
						admins: [...old.admins, userId]
					} as Group

					return updatedGroup
				}
			)

			const toastId = toast.loading(`${userName} promoting to ADMIN`)

			return { previousGroup, toastId }
		},
		onSuccess: async (_, { userName }, context) => {
			await queryClient.invalidateQueries({
				queryKey: ['group', groupId]
			})

			toast.success(`${userName} promoted to ADMIN`, { id: context.toastId })

			router.refresh()
		},
		onError: async (err, _, context) => {
			if (context?.previousGroup) {
				queryClient.setQueryData(['group', groupId], () => context.previousGroup)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: context?.toastId })
				}
			}

			return toast.error('Something went wrong', { id: context?.toastId })
		}
	})

	const { mutateAsync: mutateAsyncDemoteToRegular } = useMutation({
		mutationFn: async ({ userId }: { userId: string; userName: string }) => {
			const json = {
				groupId,
				userId
			}

			const res = await kyInstance
				.patch('groups/demote', { json })
				.json<TApiResponse<Group>>()

			return res.data
		},
		onMutate: async ({ userId, userName }: { userId: string; userName: string }) => {
			await queryClient.cancelQueries({ queryKey: ['group', groupId] })

			const previousGroup = queryClient.getQueryData<
				Prisma.GroupGetPayload<{
					include: { developers: true; projects: true }
				}>
			>(['group', groupId])

			queryClient.setQueryData(
				['group', groupId],
				(
					old: Prisma.GroupGetPayload<{
						include: { developers: true; projects: true }
					}>
				) => {
					if (!old) return old

					return {
						...old,
						admins: old.admins.filter(admin => admin !== userId)
					}
				}
			)

			const toastId = toast.loading(`${userName} demoting to REGULAR`)

			return { previousGroup, toastId }
		},
		onSuccess: async (_, { userName }, context) => {
			await queryClient.invalidateQueries({
				queryKey: ['group', groupId]
			})

			toast.success(`${userName} demoted to REGULAR`, { id: context.toastId })

			router.refresh()
		},
		onError: async (err, _, context) => {
			if (context?.previousGroup) {
				queryClient.setQueryData(['group', groupId], () => context.previousGroup)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message, { id: context?.toastId })
				}
			}

			return toast.error('Something went wrong', { id: context?.toastId })
		}
	})

	const handleKick = (id: string) => mutateAsyncKick(id)

	const handleUpdateToAdmin = (id: string, userName: string) =>
		mutateAsyncUpdateToAdmin({ userId: id, userName })

	const handleDemoteToRegular = (id: string, userName: string) =>
		mutateAsyncDemoteToRegular({ userId: id, userName })

	return { handleKick, handleUpdateToAdmin, handleDemoteToRegular }
}
