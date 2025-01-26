import { Post } from '@/core/domain/entities'
import { BaseRepository, BaseParams } from './base.repository'
import { PostsResponseDto } from '@/core/dtos'

interface PostParams extends BaseParams {
    userId?: number | null
}

interface PostRepository extends BaseRepository<Post, PostParams> {
    findMany(params: PostParams): Promise<PostsResponseDto>
}

export type { PostParams, PostRepository }
