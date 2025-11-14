import { Boxes, Folders, Home, Settings } from 'lucide-react'

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
		name: 'Groups',
		link: '/groups'
	},
	{
		icon: Folders,
		name: 'Projects',
		link: '/projects'
	}
]

export const PUBLIC_ROUTES = ['/auth/login', '/auth/register']

export const PROJECT_TYPE = [
	'LANDING_PAGE',
	'WEB_APP',
	'MOBILE_APP',
	'E_COMMERCE',
	'CMS',
	'SAAS',
	'PORTFOLIO',
	'BLOG',
	'DASHBOARD',
	'MARKETPLACE',
	'GAME',
	'CORPORATE_WEBSITE',
	'EDUCATIONAL',
	'SOCIAL_NETWORK',
	'STREAMING',
	'FINTECH',
	'HEALTHCARE',
	'GOVERNMENT',
	'AI_TOOL',
	'IOT_APP',
	'OTHER'
] as const

export const PROJECT_STATUS = {
	IN_DEVELOPMENT: 'IN_DEVELOPMENT',
	COMPLETED: 'COMPLETED',
	PAUSED: 'PAUSED',
	CANCELED: 'CANCELED'
} as const

export const TASK_STATUS = {
	IN_PROGRESS: 'IN_PROGRESS',
	COMPLETED: 'COMPLETED',
	FIRED: 'FIRED'
} as const

export const FAQS = [
	{
		question: 'How do I create a project?',
		answer: 'Go to the Projects page, click "Create Project", fill in the required fields, and submit.'
	},
	{
		question: 'Why am I seeing an error on Vercel?',
		answer: 'Make sure Prisma is only used on the server. Client-side code should not import Prisma Client or generated enums directly.'
	},
	{
		question: 'How do I reset my password?',
		answer: 'Navigate to your profile settings and click "Reset Password". Follow the instructions in the email you receive.'
	}
] as const
