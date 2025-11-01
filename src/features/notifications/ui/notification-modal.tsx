'use client'

import { useNotifications } from '../model'

export const Notifications: React.FC<{ hook: ReturnType<typeof useNotifications> }> = ({
	hook
}) => {
	const { nots } = hook

	return (
		<div>
			<h2>Notifications</h2>

			<ul className='flex flex-col gap-2'>
				{nots &&
					nots.map(not => (
						<li className='flex flex-col gap-1' key={not.id}>
							<h4 className='text-md font-medium text-white'>{not.title}</h4>
							<p className='text-secondary/50 text-base'>{not.description}</p>
						</li>
					))}
			</ul>
		</div>
	)
}
