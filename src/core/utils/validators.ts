import { CreatePostDto } from '../dtos/create-post.dto'

export const validatePostCreation = (data: CreatePostDto) => {
    const errors: string[] = []

    if (!data.title) {
        errors.push('Title is required')
    } else if (typeof data.title !== 'string') {
        errors.push('Title must be a string')
    } else if (data.title.length < 3 || data.title.length > 100) {
        errors.push('Title must be between 2 and 100 characters')
    }

    if (!data.body) {
        errors.push('Body is required')
    } else if (typeof data.body !== 'string') {
        errors.push('Body must be a string')
    } else if (data.body.length < 10 || data.body.length > 1000) {
        errors.push('Body must be between 10 and 1000 characters')
    }

    if (!data.userId) {
        errors.push('User ID is required')
    } else if (
        !Number.isInteger(Number(data.userId)) ||
        Number(data.userId) <= 0
    ) {
        errors.push('User ID must be a positive integer')
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}
