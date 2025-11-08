import { EditForm } from '@/features/group-forms'

type Props = {
	name: string
	slug: string | null
	isPublic: boolean
}

export const Edit: React.FC<Props> = ({ isPublic, name, slug }) => {
	return (
		<div className='mt-10'>
			<h4 className='text-xl'>Group details</h4>

			<EditForm name={name} slug={slug} isPublic={isPublic} />
		</div>
	)
}
