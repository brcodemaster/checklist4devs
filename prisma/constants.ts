import { hashSync } from 'bcrypt'

export const devs = [
	{
		id: '1',
		userName: 'Onlinee',
		email: 'bekzodrn@mail.ru',
		password: hashSync('Bekzod2001', 10)
	},
	{
		id: '2',
		userName: 'Behruz',
		email: 'behruzravshanbekov79@gmail.com',
		password: hashSync('Behruz2005', 10)
	},
	{
		id: '3',
		userName: 'codeWizard',
		email: 'codewizard@mail.ru',
		password: hashSync('Bekzod2001', 10)
	},
	{
		id: '4',
		userName: 'NextHero',
		email: 'nexthero@mail.ru',
		password: hashSync('Bekzod2001', 10)
	},
	{
		id: '5',
		userName: 'ReactNinja',
		email: 'reactninja@mail.ru',
		password: hashSync('Bekzod2001', 10)
	},
	{
		id: '6',
		userName: 'VueSamurai',
		email: 'vuesamurai@mail.ru',
		password: hashSync('Bekzod2001', 10)
	},
	{
		id: '7',
		userName: 'NestLord',
		email: 'nestlord@mail.ru',
		password: hashSync('Bekzod2001', 10)
	},
	{
		id: '8',
		userName: 'PrismaGuru',
		email: 'prismaguru@mail.ru',
		password: hashSync('Bekzod2001', 10)
	},
	{
		id: '9',
		userName: 'SQLKnight',
		email: 'sqlknight@mail.ru',
		password: hashSync('Bekzod2001', 10)
	},
	{
		id: '10',
		userName: 'TailwindPro',
		email: 'tailwindpro@mail.ru',
		password: hashSync('Bekzod2001', 10)
	}
]
