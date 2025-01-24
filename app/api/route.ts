import prisma from '@/lib/prisma'

export const posts = await prisma.post.findMany({
    include: {
        user: true,
    },
})
