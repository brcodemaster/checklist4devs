import ky from 'ky'

export const kyInstance = ky.create({
	prefixUrl: 'http://localhost:3000/api',
	credentials: 'include'
})
