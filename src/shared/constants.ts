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
		icon: Folders,
		name: 'Groups',
		link: '/groups'
	},
	{
		icon: Boxes,
		name: 'Projects',
		link: '/projects'
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
		question: 'Who can create groups?',
		answer: 'Go to the Groups page, click "Create Group", fill in the required fields, and submit.'
	},
	{
		question: 'How do I change the admin of a group?',
		answer: 'Go to the Groups page, select a member from the list, and assign them as the new admin.'
	},
	{
		question: 'How do I create a project?',
		answer: 'Go to the Projects page, click "Create Project", fill in the required fields, and submit.'
	},
	{
		question: 'How do I create a task?',
		answer: 'Open a project, go to the Tasks tab, click “New Task”, enter the task details (title, description, assigned users, deadline).'
	},
	{
		question: 'How do task deadlines (burn date) work?',
		answer: 'Each task has a deadline which indicates when the task expires. After this date, the task is considered overdue.'
	},
	{
		question: 'Can one task have multiple assignees?',
		answer: 'No. Each task can have only one assignee. The creator of the task is saved separately as the task author, but the executor is always a single user.'
	}
] as const
