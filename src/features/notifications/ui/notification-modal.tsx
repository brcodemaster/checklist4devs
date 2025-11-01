'use client'

import { Notification } from '@@/generated/client'

export const Notifications: React.FC<{ nots: Notification[] | undefined }> = ({ nots }) => {
	return (
		<div>
			<div className='border-b-muted-secondary border-b p-4'>
				<h2>Notifications</h2>
			</div>

			<ul className='bg-foreground flex h-[400px] flex-col gap-2 overflow-y-auto p-4'>
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
