import prisma from '@core/infrastructure/prisma/client'
import { PostRepository } from '@/core/domain/repositories'
import { Post } from '@/core/domain/entities'
import { BaseParams } from '@/core/domain/repositories'
import { CreatePostDto } from '@/core/dtos/create-post.dto'

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

    async findUser(userId: number) {
        return prisma.user.findUnique({
            where: { id: userId }
        })
    }

    async create(data: CreatePostDto): Promise<Post> {
        const post = await prisma.post.create({
            data: {
                title: data.title,
                body: data.body,
                userId: data.userId,
            },
            include: {
                user: true
            }
        })
        
        return post as Post
    }
}
