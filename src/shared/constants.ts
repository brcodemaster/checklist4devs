import { Boxes, LucideTableRowsSplit, Proportions, Settings } from 'lucide-react'

process.loadEnvFile

export const prefixUrl = process.env.BASE_URL + '/api/'

export const navigation = [
	{
		icon: Settings,
		name: 'Account preferences',
		link: '/settings'
	},
	{
		icon: Boxes,
		name: 'Projects',
		link: '/projects'
	},
	{
		icon: LucideTableRowsSplit,
		name: 'Usage',
		link: '/usage'
	},
	{
		icon: Proportions,
		name: 'Billing',
		link: '/billing'
	}
]
