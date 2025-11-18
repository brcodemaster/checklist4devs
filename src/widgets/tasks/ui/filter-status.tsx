import { Dispatch, SetStateAction } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'

import { TaskStatus } from '@/generated/index'

export const FilterStatus: React.FC<{
	statusValue: TaskStatus | 'all' | 'burning'
	setStatusValue: Dispatch<SetStateAction<TaskStatus | 'all' | 'burning'>>
}> = ({ statusValue, setStatusValue }) => {
	return (
		<Select
			value={statusValue}
			onValueChange={val => setStatusValue(val as TaskStatus | 'all' | 'burning')}
		>
			<SelectTrigger className='shrink-0'>
				<SelectValue placeholder='Status' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='COMPLETED'>Completed</SelectItem>
				<SelectItem value='IN_PROGRESS'>In development</SelectItem>
				<SelectItem value='FIRED'>Fired (expired)</SelectItem>
				<SelectItem value='burning'>Burning soon</SelectItem>
				<SelectItem value='all'>All statuses</SelectItem>
			</SelectContent>
		</Select>
	)
}
