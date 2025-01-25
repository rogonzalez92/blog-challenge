import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    const page = Number(url.searchParams.get('page') || '1')
    const limit = 6
    const offset = (page - 1) * limit

    const posts = await prisma.post.findMany({
        where: userId ? { userId: Number(userId) } : undefined,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'asc' },
        include: { user: true },
    })

    const totalPosts = await prisma.post.count({
        where: userId ? { userId: Number(userId) } : undefined,
    })

    return NextResponse.json({
        posts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: page,
    })
}
