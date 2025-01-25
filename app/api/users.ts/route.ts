import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const users = await prisma.user.findMany({
        orderBy: {
            name: 'asc',
        },
    })

    return NextResponse.json(users)
}
