import { PostParams, PostRepository } from '@/core/domain/repositories'
import { PostsResponseDto } from '@/core/dtos'
import { ApiError } from '@/core/errors/api.error'
import { Post } from '../domain/entities'
import { CreatePostDto } from '@/core/dtos/create-post.dto'

export class PostUseCase {
    constructor(private readonly postRepository: PostRepository) {}

    async getPosts(params: PostParams): Promise<PostsResponseDto> {
        const result = await this.postRepository.findMany(params)
        return {
            data: result.data,
            totalPages: result.totalPages,
            currentPage: result.currentPage,
        }
    }

    async deletePost(id: number): Promise<boolean> {
        try {
            const success = await this.postRepository.delete(id)
            if (!success) {
                throw new ApiError(404, 'Post not found')
            }
            return true
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw new ApiError(500, 'Failed to delete post')
        }
    }

    async createPost(data: CreatePostDto): Promise<Post> {
        try {
            const user = await this.postRepository.findUser(data.userId)
            if (!user) {
                throw new ApiError(404, 'User not found')
            }

            const post = await this.postRepository.create(data)
            if (!post) {
                throw new ApiError(500, 'Failed to create post')
            }

            return post
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw new ApiError(500, 'Failed to create post')
        }
    }
}
