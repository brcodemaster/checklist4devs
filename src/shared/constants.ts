import { Settings } from 'lucide-react'

process.loadEnvFile

export const prefixUrl = process.env.BASE_URL + '/api/'

export const navigation = [
	{
		icon: Settings,
		name: 'Account preferences',
		link: '/settings'
	}
]
