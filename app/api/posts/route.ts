import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/core/infrastructure/prisma/client'
import { PostUseCase } from '@/core/use-cases'
import { PrismaPostRepository } from '@/core/infrastructure/repositories'

const postRepository = new PrismaPostRepository(prisma)
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
