import { EditForm } from '@/features/account-forms'

import { User } from '@/generated/index'

type Props = {
	user: User
}

export const Edit: React.FC<Props> = ({ user }) => {
	return (
		<div className='mt-10'>
			<h4 className='text-xl'>Account preferences</h4>

			<EditForm user={user} />
		</div>
	)
}
