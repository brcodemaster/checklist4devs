import ky from 'ky'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const kyInstance = ky.create({
	prefixUrl: `${baseUrl}/api/`,
	credentials: 'include'
})
