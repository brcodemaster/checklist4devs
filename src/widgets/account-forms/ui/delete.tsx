import { DeleteForm } from '@/features/account-forms'

import { User } from '@/generated/index'

export const Delete: React.FC<{ user: User }> = ({ user }) => {
	return (
		<div className='mt-10'>
			<h4 className='text-xl'>Danger Zone</h4>

			<DeleteForm user={user} />
		</div>
	)
}
