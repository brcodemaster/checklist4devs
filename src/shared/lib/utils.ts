import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { TaskStatus } from '@/generated/client'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const isTaskBurned = (status: TaskStatus): boolean => {
	if (status === 'FIRED') return true

	return false
}

export const LIMIT_NEAR_DAY = 2

export const isBurningDayNear = (deadlineAt: Date): boolean => {
	const today = new Date().getTime()
	const deadline = new Date(deadlineAt).getTime()

	const diffDays = Math.floor((deadline - today) / (1000 * 60 * 60 * 24))

	return diffDays <= LIMIT_NEAR_DAY && diffDays >= 0
}

export const prettyDateMaker = (date: Date | string | null | undefined) => {
	if (!date) return ''

	const d = new Date(date)

	if (isNaN(d.getTime())) return ''

	return new Intl.DateTimeFormat('ru-RU').format(d)
}
