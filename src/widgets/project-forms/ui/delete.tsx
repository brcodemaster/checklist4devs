import { DeleteForm } from '@/features/project-forms'

export const Delete: React.FC = () => {
	return (
		<div className='mt-10'>
			<h4 className='text-xl'>Danger Zone</h4>

			<DeleteForm />
		</div>
	)
}
