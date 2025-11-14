import { hashSync } from 'bcrypt'

import { devs } from './constants'
import { prisma } from './prisma-client'
import { ProjectType } from '@/generated/index'

export async function up() {
	await Promise.all(
		devs.map(dev =>
			prisma.user.create({
				data: {
					...dev
				}
			})
		)
	)

	await prisma.group.create({
		data: {
			id: '1',
			name: 'bb',
			password: hashSync('123456', 10),
			creator: { connect: { id: '1' } },
			developers: {
				connect: [
					{ id: '1' },
					{ id: '2' },
					{ id: '3' },
					{ id: '4' },
					{ id: '5' },
					{ id: '6' },
					{ id: '7' }
				]
			},
			admins: ['1'],
			projects: {
				create: {
					id: '1',
					password: hashSync('123456', 10),
					name: 'Resume builder',
					status: 'IN_DEVELOPMENT',
					type: ProjectType.WEB_APP,
					isPublic: false,
					links: [
						'https://resume-builder-five-zeta.vercel.app/',
						'https://github.com/brcodemaster/resume-builder'
					],
					creator: { connect: { id: '1' } },
					tasks: {
						create: [
							{
								id: '1',
								text: 'Setup the initial project repository, configure Git, initialize README, add .gitignore, and create the main branch for development with all collaborators having access permissions properly configured.',
								status: 'COMPLETED',
								assigner: { connect: { id: '1' } },
								creator: { connect: { id: '1' } },
								deadlineAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
							},
							{
								id: '2',
								text: 'Design database schema including users, projects, tasks, and their relationships, make sure to include all necessary constraints, indexes, and foreign keys to ensure data integrity and optimal performance in all queries.',
								status: 'IN_PROGRESS',
								assigner: { connect: { id: '2' } },
								creator: { connect: { id: '1' } },
								deadlineAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
							},
							{
								id: '3',
								text: 'Implement backend logic for user authentication, registration, password reset, role management, and API token generation, ensuring security best practices including hashing passwords, validating input, and preventing unauthorized access to sensitive data.',
								status: 'IN_PROGRESS',
								assigner: { connect: { id: '3' } },
								creator: { connect: { id: '1' } },
								deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
							},
							{
								id: '4',
								text: 'Write comprehensive API documentation covering all endpoints, parameters, response structures, error codes, examples, and authentication methods, so that frontend developers, QA engineers, and external clients can integrate with the backend easily and correctly.',
								status: 'IN_PROGRESS',
								assigner: { connect: { id: '4' } },
								creator: { connect: { id: '1' } },
								deadlineAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
							},
							{
								id: '5',
								text: 'Setup Next.js frontend project, configure TypeScript, Tailwind CSS, ESLint, Prettier, Husky hooks, and folder structure for scalable development and maintainability with multiple teams working in parallel on different modules.',
								status: 'IN_PROGRESS',
								assigner: { connect: { id: '2' } },
								creator: { connect: { id: '1' } },
								deadlineAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
							},
							{
								id: '6',
								text: 'Create reusable React components for dashboard, user profile, project cards, task lists, modals, notifications, and forms, following best practices for accessibility, performance optimization, state management, and responsive design across all devices.',
								status: 'IN_PROGRESS',
								assigner: { connect: { id: '3' } },
								creator: { connect: { id: '1' } },
								deadlineAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
							},
							{
								id: '7',
								text: 'Write unit and integration tests for backend services, API routes, database models, and utility functions, ensuring coverage for all edge cases, error handling, and expected behavior using Jest and testing-library for maintainable and reliable code.',
								status: 'COMPLETED',
								assigner: { connect: { id: '4' } },
								creator: { connect: { id: '2' } },
								deadlineAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
							},
							{
								id: '8',
								text: 'Setup CI/CD pipeline with GitHub Actions, automate testing, linting, building, and deployment processes for frontend and backend, integrate notifications for failures, and ensure smooth and safe deployment to staging and production environments.',
								status: 'IN_PROGRESS',
								assigner: { connect: { id: '5' } },
								creator: { connect: { id: '2' } },
								deadlineAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
							},
							{
								id: '9',
								text: 'Deploy the application to staging server, configure environment variables, SSL certificates, reverse proxy, domain routing, logging, and monitoring to ensure secure and stable access for QA team and early testers with minimal downtime.',
								status: 'FIRED',
								assigner: { connect: { id: '1' } },
								creator: { connect: { id: '3' } },
								deadlineAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
							},
							{
								id: '10',
								text: 'Implement user authentication flows including signup, login, forgot password, and logout, integrate frontend with backend, handle validation and error messages, and ensure secure token storage and session management across multiple devices.',
								status: 'IN_PROGRESS',
								assigner: { connect: { id: '2' } },
								creator: { connect: { id: '3' } },
								deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
							}
						]
					}
				}
			}
		}
	})

	await prisma.group.create({
		data: {
			id: '2',
			name: 'Bear-coders',
			password: hashSync('123456', 10),
			creator: { connect: { id: '3' } },
			developers: {
				connect: [{ id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }]
			},
			admins: ['4'],
			projects: {
				create: {
					id: '2',
					password: hashSync('123456', 10),
					name: 'Task manager',
					status: 'COMPLETED',
					type: ProjectType.LANDING_PAGE,
					creator: { connect: { id: '3' } },
					tasks: {
						create: [
							{
								id: '11',
								text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.',
								status: 'COMPLETED',
								assigner: { connect: { id: '1' } },
								creator: { connect: { id: '2' } },
								deadlineAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
							},
							{
								id: '12',
								text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis.',
								status: 'COMPLETED',
								assigner: { connect: { id: '2' } },
								creator: { connect: { id: '3' } },
								deadlineAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
							},
							{
								id: '13',
								text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.',
								status: 'FIRED',
								assigner: { connect: { id: '3' } },
								creator: { connect: { id: '1' } },
								deadlineAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
							},
							{
								id: '14',
								text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
								status: 'COMPLETED',
								assigner: { connect: { id: '4' } },
								creator: { connect: { id: '5' } },
								deadlineAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
							},
							{
								id: '15',
								text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
								status: 'COMPLETED',
								assigner: { connect: { id: '5' } },
								creator: { connect: { id: '2' } },
								deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
							},
							{
								id: '16',
								text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.',
								status: 'COMPLETED',
								assigner: { connect: { id: '1' } },
								creator: { connect: { id: '4' } },
								deadlineAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
							},
							{
								id: '17',
								text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.',
								status: 'FIRED',
								assigner: { connect: { id: '2' } },
								creator: { connect: { id: '3' } },
								deadlineAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
							},
							{
								id: '18',
								text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
								status: 'COMPLETED',
								assigner: { connect: { id: '3' } },
								creator: { connect: { id: '1' } },
								deadlineAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
							},
							{
								id: '19',
								text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
								status: 'COMPLETED',
								assigner: { connect: { id: '4' } },
								creator: { connect: { id: '5' } },
								deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
							},
							{
								id: '20',
								text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
								status: 'COMPLETED',
								assigner: { connect: { id: '5' } },
								creator: { connect: { id: '2' } },
								deadlineAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
							}
						]
					}
				}
			}
		}
	})

	await prisma.project.create({
		data: {
			group: { connect: { id: '1' } },
			id: '3',
			password: hashSync('123456', 10),
			name: 'Tsukurou',
			status: 'PAUSED',
			type: ProjectType.WEB_APP,
			links: [
				'https://resume-builder-five-zeta.vercel.app/',
				'https://github.com/brcodemaster/resume-builder'
			],
			creator: { connect: { id: '1' } },
			tasks: {
				create: [
					{
						id: '21',
						text: 'Setup the initial project repository, configure Git, initialize README, add .gitignore, and create the main branch for development with all collaborators having access permissions properly configured.',
						status: 'COMPLETED',
						assigner: { connect: { id: '1' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
					},
					{
						id: '22',
						text: 'Design database schema including users, projects, tasks, and their relationships, make sure to include all necessary constraints, indexes, and foreign keys to ensure data integrity and optimal performance in all queries.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '2' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
					},
					{
						id: '23',
						text: 'Implement backend logic for user authentication, registration, password reset, role management, and API token generation, ensuring security best practices including hashing passwords, validating input, and preventing unauthorized access to sensitive data.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '3' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
					},
					{
						id: '24',
						text: 'Write comprehensive API documentation covering all endpoints, parameters, response structures, error codes, examples, and authentication methods, so that frontend developers, QA engineers, and external clients can integrate with the backend easily and correctly.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '4' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
					},
					{
						id: '25',
						text: 'Setup Next.js frontend project, configure TypeScript, Tailwind CSS, ESLint, Prettier, Husky hooks, and folder structure for scalable development and maintainability with multiple teams working in parallel on different modules.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '2' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
					},
					{
						id: '26',
						text: 'Create reusable React components for dashboard, user profile, project cards, task lists, modals, notifications, and forms, following best practices for accessibility, performance optimization, state management, and responsive design across all devices.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '3' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
					},
					{
						id: '27',
						text: 'Write unit and integration tests for backend services, API routes, database models, and utility functions, ensuring coverage for all edge cases, error handling, and expected behavior using Jest and testing-library for maintainable and reliable code.',
						status: 'COMPLETED',
						assigner: { connect: { id: '4' } },
						creator: { connect: { id: '2' } },
						deadlineAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
					},
					{
						id: '28',
						text: 'Setup CI/CD pipeline with GitHub Actions, automate testing, linting, building, and deployment processes for frontend and backend, integrate notifications for failures, and ensure smooth and safe deployment to staging and production environments.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '5' } },
						creator: { connect: { id: '2' } },
						deadlineAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
					},
					{
						id: '29',
						text: 'Deploy the application to staging server, configure environment variables, SSL certificates, reverse proxy, domain routing, logging, and monitoring to ensure secure and stable access for QA team and early testers with minimal downtime.',
						status: 'FIRED',
						assigner: { connect: { id: '1' } },
						creator: { connect: { id: '3' } },
						deadlineAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
					},
					{
						id: '30',
						text: 'Implement user authentication flows including signup, login, forgot password, and logout, integrate frontend with backend, handle validation and error messages, and ensure secure token storage and session management across multiple devices.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '2' } },
						creator: { connect: { id: '3' } },
						deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
					}
				]
			}
		}
	})

	await prisma.project.create({
		data: {
			group: { connect: { id: '2' } },
			id: '4',
			password: hashSync('123456', 10),
			name: 'Halol Hazina',
			status: 'CANCELED',
			type: ProjectType.WEB_APP,
			links: [
				'https://resume-builder-five-zeta.vercel.app/',
				'https://github.com/brcodemaster/resume-builder'
			],
			creator: { connect: { id: '1' } },
			isPublic: false,
			tasks: {
				create: [
					{
						id: '31',
						text: 'Setup the initial project repository, configure Git, initialize README, add .gitignore, and create the main branch for development with all collaborators having access permissions properly configured.',
						status: 'COMPLETED',
						assigner: { connect: { id: '1' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
					},
					{
						id: '32',
						text: 'Design database schema including users, projects, tasks, and their relationships, make sure to include all necessary constraints, indexes, and foreign keys to ensure data integrity and optimal performance in all queries.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '2' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
					},
					{
						id: '33',
						text: 'Implement backend logic for user authentication, registration, password reset, role management, and API token generation, ensuring security best practices including hashing passwords, validating input, and preventing unauthorized access to sensitive data.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '3' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
					},
					{
						id: '34',
						text: 'Write comprehensive API documentation covering all endpoints, parameters, response structures, error codes, examples, and authentication methods, so that frontend developers, QA engineers, and external clients can integrate with the backend easily and correctly.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '4' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
					},
					{
						id: '35',
						text: 'Setup Next.js frontend project, configure TypeScript, Tailwind CSS, ESLint, Prettier, Husky hooks, and folder structure for scalable development and maintainability with multiple teams working in parallel on different modules.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '2' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
					},
					{
						id: '36',
						text: 'Create reusable React components for dashboard, user profile, project cards, task lists, modals, notifications, and forms, following best practices for accessibility, performance optimization, state management, and responsive design across all devices.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '3' } },
						creator: { connect: { id: '1' } },
						deadlineAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
					},
					{
						id: '37',
						text: 'Write unit and integration tests for backend services, API routes, database models, and utility functions, ensuring coverage for all edge cases, error handling, and expected behavior using Jest and testing-library for maintainable and reliable code.',
						status: 'COMPLETED',
						assigner: { connect: { id: '4' } },
						creator: { connect: { id: '2' } },
						deadlineAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
					},
					{
						id: '38',
						text: 'Setup CI/CD pipeline with GitHub Actions, automate testing, linting, building, and deployment processes for frontend and backend, integrate notifications for failures, and ensure smooth and safe deployment to staging and production environments.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '5' } },
						creator: { connect: { id: '2' } },
						deadlineAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
					},
					{
						id: '39',
						text: 'Deploy the application to staging server, configure environment variables, SSL certificates, reverse proxy, domain routing, logging, and monitoring to ensure secure and stable access for QA team and early testers with minimal downtime.',
						status: 'FIRED',
						assigner: { connect: { id: '1' } },
						creator: { connect: { id: '3' } },
						deadlineAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
					},
					{
						id: '40',
						text: 'Implement user authentication flows including signup, login, forgot password, and logout, integrate frontend with backend, handle validation and error messages, and ensure secure token storage and session management across multiple devices.',
						status: 'IN_PROGRESS',
						assigner: { connect: { id: '2' } },
						creator: { connect: { id: '3' } },
						deadlineAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
					}
				]
			}
		}
	})
}

export async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "groups" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "projects" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "tasks" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "notifications" RESTART IDENTITY CASCADE;`
}

export async function main() {
	try {
		await down()
		await up()

		console.log('First step with: SUCCESS🍃')
	} catch (error) {
		console.log('First step with: FAIL' + error)
	}
}

main()
	.then(() => {
		console.log('Finish with: SUCCESS🍃')
	})
	.catch(err => {
		console.log('Finish with: FAIL' + err)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
