'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { kyInstance } from '@/shared/api'
import { useAuth } from '@/shared/contexts/auth-context'
import { TMetaProjects } from '@/shared/types/default-types'

import { Group, Prisma } from '@/generated/client'
import { ProjectStatus, ProjectType } from '@/generated/enums'

const formSchema = z.object({
	name: z
		.string({ error: 'Required field' })
		.min(3, { error: 'Group name must be at least 3 characters long' }),
	type: z.enum(ProjectType),
	isPublic: z.boolean(),
	status: z.enum(ProjectStatus),
	links: z.array(z.object({ value: z.string() })),
	password: z.string().optional()
})

export type TForm = z.infer<typeof formSchema>

export const useProjectForms = (
	project?: Prisma.ProjectGetPayload<{
		include: { tasks: true; group: { include: { developers: true } } }
	}>
) => {
	const { id } = useParams<{ id: string }>()

	const { user } = useAuth()

	const queryClient = useQueryClient()
	const router = useRouter()

	const defaultValues = {
		name: project?.name ?? '',
		isPublic: project?.isPublic ?? false,
		status: project?.status ?? 'IN_DEVELOPMENT',
		type: project?.type ?? 'LANDING_PAGE',
		links: (project?.links ?? []).map(link => ({ value: link }))
	} as TForm

	const form = useForm<TForm>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const { append, fields, remove, update } = useFieldArray({
		name: 'links',
		control: form.control
	})

	const { mutateAsync: mutateAsyncUpdate } = useMutation({
		mutationFn: async (payload: TForm) => {
			const group = {
				id,
				payload: {
					...payload,
					links: payload.links.map(link => link.value)
				}
			}

			return await kyInstance.patch('projects/update', { json: group }).json<Group>()
		},
		onMutate: async (payload: TForm) => {
			await queryClient.cancelQueries({ queryKey: ['groups', id] })

			const previousGroup = queryClient.getQueryData<
				Prisma.GroupGetPayload<{ include: { developers: true; projects: true } }>
			>(['group', id])

			queryClient.setQueryData(
				['group', id],
				(
					old: Prisma.GroupGetPayload<{ include: { developers: true; projects: true } }>
				) => {
					if (!old) return old

					return { ...old, ...payload }
				}
			)

			return { previousGroup }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['group', id] })
			queryClient.invalidateQueries({ queryKey: ['groups'] })

			return toast.success('Group updated successfully')
		},
		onError: async (err, _, context) => {
			if (context?.previousGroup)
				queryClient.setQueryData(['groups', id], () => context?.previousGroup)

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message)
				}
			}

			return toast.error('Something went wrong')
		}
	})

	const { mutateAsync: mutateAsyncDelete } = useMutation({
		mutationFn: async () => {
			const json = {
				id,
				userId: user?.id
			}

			await kyInstance.delete('projects/delete', { json }).json<Group>()
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['group', id] })

			const previousGroup = queryClient.getQueryData<
				Prisma.GroupGetPayload<{ include: { developers: true; projects: true } }>
			>(['group', id])
			const previousProjects = queryClient.getQueryData<TMetaProjects[]>(['projects'])

			queryClient.setQueryData(
				['groups'],
				(
					old: Prisma.GroupGetPayload<{ include: { developers: true; projects: true } }>[]
				) => {
					if (!old) return old

					return old.filter(group => group.id !== id)
				}
			)

			queryClient.setQueryData(['projects'], (old: TMetaProjects[]) => {
				if (!old) return old

				return old.filter(group => group.groupId !== id)
			})

			return { previousGroup, previousProjects }
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['groups'] })
			await queryClient.invalidateQueries({ queryKey: ['projects'] })

			router.push('/')

			return toast.success('Group deleted successfully')
		},
		onError: async (err, _, context) => {
			if (context?.previousGroup && context.previousProjects) {
				queryClient.setQueryData(['groups', id], () => context?.previousGroup)
				queryClient.setQueryData(['projects'], () => context?.previousProjects)
			}

			if (err instanceof HTTPError) {
				const body = await err.response.json().catch(() => null)
				if (body?.message) {
					return toast.error(body.message)
				}
			}

			return toast.error('Something went wrong')
		}
	})

	const handleSubmit: SubmitHandler<TForm> = data => mutateAsyncUpdate(data)

	const handleDelete = () => mutateAsyncDelete()

	const handleReset = () => form.reset(defaultValues)

	return {
		form,
		handleDelete,
		handleSubmit,
		handleReset,
		append,
		fields,
		remove,
		update
	}
}
