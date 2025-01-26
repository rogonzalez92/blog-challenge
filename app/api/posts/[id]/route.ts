import prisma from '@/core/infrastructure/prisma/client'
import { NextResponse } from 'next/server'
import { PostUseCase } from '@/core/use-cases'
import { PrismaPostRepository } from '@/core/infrastructure/repositories'
import { ApiError } from '@/core/errors/api.error'

const postRepository = new PrismaPostRepository(prisma)
const postService = new PostUseCase(postRepository)

export async function DELETE(
    req: Request,
    context: { params: { id: string } }
) {
    try {
        const { id } = await context.params
        await postService.deletePost(Number(id))
        return NextResponse.json({ success: true })
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
