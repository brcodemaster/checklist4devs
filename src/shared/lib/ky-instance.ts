import ky from 'ky'

import { prefixUrl } from '../constants'

export const kyInstance = ky.create({
	prefixUrl,
	credentials: 'include'
})
