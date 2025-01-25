import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    const posts = await prisma.post.findMany({
        where: userId
            ? {
                  userId: Number(userId),
              }
            : undefined,
        orderBy: {
            createdAt: 'asc',
        },
        include: {
            user: true,
        },
    })

    return NextResponse.json(posts)
}
