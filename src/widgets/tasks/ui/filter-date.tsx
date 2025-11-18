import { Dispatch, SetStateAction } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'

export const FilterDate: React.FC<{
	dateValue: 'today' | 'month' | 'all' | 'week'
	setDateValue: Dispatch<SetStateAction<'today' | 'month' | 'all' | 'week'>>
}> = ({ dateValue, setDateValue }) => {
	return (
		<Select
			value={dateValue}
			onValueChange={val => setDateValue(val as 'today' | 'month' | 'all' | 'week')}
		>
			<SelectTrigger className='shrink-0'>
				<SelectValue placeholder='Date' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='today'>Today</SelectItem>
				<SelectItem value='week'>Last week</SelectItem>
				<SelectItem value='month'>Last month</SelectItem>
				<SelectItem value='all'>All dates</SelectItem>
			</SelectContent>
		</Select>
	)
}
