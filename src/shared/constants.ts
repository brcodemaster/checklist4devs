import { Boxes, Folders, Home, Settings } from 'lucide-react'

process.loadEnvFile

export const prefixUrl = process.env.BASE_URL + '/api/'

export const userNavigation = [
	{
		icon: Settings,
		name: 'Account preferences',
		link: '/settings'
	}
]

export const mobileNavigation = [
	{
		icon: Boxes,
		name: 'Projects',
		link: '/projects'
	},
	{
		icon: Folders,
		name: 'Groups',
		link: '/groups'
	},
	{
		icon: Settings,
		name: 'Account preferences',
		link: '/settings'
	}
]

export const sidebarNavigation = [
	{
		icon: Home,
		name: 'Home',
		link: '/'
	},
	{
		icon: Boxes,
		name: 'Projects',
		link: '/projects'
	},
	{
		icon: Folders,
		name: 'Groups',
		link: '/groups'
	}
]
