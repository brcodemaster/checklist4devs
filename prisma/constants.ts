import { hashSync } from 'bcrypt'

export const devs = [
	{
		id: '1',
		userName: 'Onlinee',
		fullName: 'Onlinee Fullname',
		email: 'bekzodrn@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '2',
		userName: 'DevMaster',
		fullName: 'DevMaster Fullname',
		email: 'devmaster@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '3',
		userName: 'codeWizard',
		fullName: 'CodeWizard Fullname',
		email: 'codewizard@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '4',
		userName: 'NextHero',
		fullName: 'NextHero Fullname',
		email: 'nexthero@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '5',
		userName: 'ReactNinja',
		fullName: 'ReactNinja Fullname',
		email: 'reactninja@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '6',
		userName: 'VueSamurai',
		fullName: 'VueSamurai Fullname',
		email: 'vuesamurai@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '7',
		userName: 'NestLord',
		fullName: 'NestLord Fullname',
		email: 'nestlord@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '8',
		userName: 'PrismaGuru',
		fullName: 'PrismaGuru Fullname',
		email: 'prismaguru@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '9',
		userName: 'SQLKnight',
		fullName: 'SQLKnight Fullname',
		email: 'sqlknight@mail.ru',
		password: hashSync('11111111', 10)
	},
	{
		id: '10',
		userName: 'TailwindPro',
		fullName: 'TailwindPro Fullname',
		email: 'tailwindpro@mail.ru',
		password: hashSync('11111111', 10)
	}
]
