import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const posts = await prisma.post.findMany({
        include: {
            user: true,
        },
    })
    return NextResponse.json(posts)
}
