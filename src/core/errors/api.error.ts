export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public details?: unknown
    ) {
        super(message)
        this.name = 'ApiError'
    }
}