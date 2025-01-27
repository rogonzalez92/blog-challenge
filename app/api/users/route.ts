import { NextResponse } from 'next/server'
import { UserUseCase } from '@/core/use-cases'
import { PrismaUserRepository } from '@/core/infrastructure/repositories'
import { ApiError } from '@/core/errors/api.error'

const userRepository = new PrismaUserRepository()
const userService = new UserUseCase(userRepository)

export async function GET() {
    try {
        const response = await userService.getUsers()
        return NextResponse.json(response)
    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json(
                { error: error.message },
                { status: error.statusCode }
            )
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
