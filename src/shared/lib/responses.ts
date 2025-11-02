import { NextResponse } from 'next/server'

import { ApiError } from './errors'

type TApiResponse<T = unknown> = {
	success: boolean
	message: string
	data: T
}

export const ApiResponse = <T = unknown>(
	data: T,
	message: string
): NextResponse<TApiResponse<T>> => {
	return NextResponse.json({
		success: true,
		message,
		data
	})
}

export const ErrorApiResponse = (error: unknown): NextResponse<TApiResponse<null>> => {
	if (error instanceof ApiError) {
		if (error.name === 'TokenExpiredError') {
			return NextResponse.json(
				{
					success: false,
					message: error.message,
					data: null
				},
				{ status: error.statusCode, statusText: error.name }
			)
		}

		return NextResponse.json(
			{
				success: false,
				message: error.message,
				data: null
			},
			{ status: error.statusCode, statusText: error.name }
		)
	}

	return NextResponse.json({
		success: false,
		message: 'Something went wrong' + error,
		data: null
	})
}
