import { PrismaClient } from '@prisma/client'
import { PostRepository } from '@/core/domain/repositories'
import { Post } from '@/core/domain/entities'
import { BaseParams } from '@/core/domain/repositories'

interface PostParams extends BaseParams {
    userId?: number | null
}

export class PrismaPostRepository implements PostRepository {
    constructor(private prisma: PrismaClient) {}

    async findMany(params: PostParams) {
        const { page, userId, limit } = params
        const offset = (page - 1) * limit

        const [posts, total] = await Promise.all([
            this.prisma.post.findMany({
                where: userId ? { userId } : undefined,
                skip: offset,
                take: limit,
                orderBy: { createdAt: 'asc' },
                include: { user: true },
            }),
            this.prisma.post.count({
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
            await this.prisma.post.delete({
                where: { id },
            })
            return true
        } catch (error) {
            console.error('Delete error:', error)
            return false
        }
    }
}
