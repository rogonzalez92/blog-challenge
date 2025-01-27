import prisma from '@core/infrastructure/prisma/client'
import { PostRepository } from '@/core/domain/repositories'
import { Post } from '@/core/domain/entities'
import { BaseParams } from '@/core/domain/repositories'

interface PostParams extends BaseParams {
    userId?: number | null
}

export class PrismaPostRepository implements PostRepository {
    async findMany(params: PostParams) {
        const { page, userId, limit } = params
        const offset = (page - 1) * limit

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where: userId ? { userId } : undefined,
                skip: offset,
                take: limit,
                orderBy: { createdAt: 'asc' },
                include: { user: true },
            }),
            prisma.post.count({
                where: userId ? { userId } : undefined,
            }),
        ])

        return {
            data: posts as Post[],
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            await prisma.post.delete({
                where: { id },
            })
            return true
        } catch (error) {
            console.error('Delete error:', error)
            return false
        }
    }
}
