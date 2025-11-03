import { NextRequest } from 'next/server'

import { ErrorApiResponse } from '@/shared/lib'

export async function GET(request: NextRequest) {
	try {
	} catch (error) {
		return ErrorApiResponse(error)
	}
}
