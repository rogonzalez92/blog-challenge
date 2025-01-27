import { NextResponse, NextRequest } from 'next/server'
import { PostUseCase } from '@/core/use-cases'
import { PrismaPostRepository } from '@/core/infrastructure/repositories'
import { ApiError } from '@/core/errors/api.error'
import { validatePostCreation } from '@/core/utils/validators'

const postRepository = new PrismaPostRepository()
const postService = new PostUseCase(postRepository)

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    const page = Number(url.searchParams.get('page') || '1')
    const limit = 6

    const response = await postService.getPosts({
        page,
        userId: userId ? Number(userId) : null,
        limit,
    })

    return NextResponse.json(response)
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validation = validatePostCreation(body)

        if (!validation.isValid) {
            return NextResponse.json(
                { errors: validation.errors },
                { status: 400 }
            )
        }

        const post = await postService.createPost({
            title: body.title.trim(),
            body: body.body.trim(),
            userId: Number(body.userId),
        })

        return NextResponse.json(post, { status: 201 })
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
