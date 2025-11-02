export class ApiError extends Error {
	name: string
	message: string
	statusCode: number

	constructor({ name, statusCode }: { name: string; statusCode: number }, message: string) {
		super(message)

		this.name = name
		this.message = message
		this.statusCode = statusCode
	}
}

export const BASE_ERRORS = {
	BadRequest: {
		name: 'BadRequestError',
		statusCode: 400
	},
	Unauthorized: {
		name: 'UnauthorizedError',
		statusCode: 401
	},
	Forbidden: {
		name: 'ForbiddenError',
		statusCode: 403
	},
	NotFound: {
		name: 'NotFoundError',
		statusCode: 404
	},
	Conflict: {
		name: 'ConflictError',
		statusCode: 409
	},
	InternalServerError: {
		name: 'InternalServerError',
		statusCode: 500
	},
	TokenExpiredError: {
		name: 'TokenExpiredError',
		statusCode: 400
	},
	InvalidTokenError: {
		name: 'InvalidTokenError',
		statusCode: 400
	}
} as const
