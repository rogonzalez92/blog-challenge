import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
    req: Request,
    context: { params: { id: string } }
) {
    const { id } = await context.params
    try {
        const deletedPost = await prisma.post.delete({
            where: { id: Number(id) },
        })
        return NextResponse.json(deletedPost)
    } catch (error) {
        return NextResponse.json(
            {
                error: {
                    message: 'Post not found or could not be deleted',
                    error,
                },
            },
            { status: 500 }
        )
    }
}
