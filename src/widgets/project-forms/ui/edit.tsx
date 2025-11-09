import { EditForm } from '@/features/project-forms'

import { Prisma } from '@/generated/client'

type Props = {
	project: Prisma.ProjectGetPayload<{
		include: { tasks: true; group: { include: { developers: true } } }
	}>
}
export const Edit: React.FC<Props> = ({ project }) => {
	return (
		<div className='mt-10'>
			<h4 className='text-xl'>Project details</h4>

			<EditForm project={project} />
		</div>
	)
}
