import { PostParams, PostRepository } from '@/core/domain/repositories'
import { PostsResponseDto } from '@/core/dtos'
import { ApiError } from '@/core/errors/api.error'

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
}
