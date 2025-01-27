import { Post, User } from '@/core/domain/entities'
import { BaseRepository, BaseParams } from './base.repository'
import { PostsResponseDto } from '@/core/dtos'
import { CreatePostDto } from '@/core/dtos/create-post.dto'

interface PostParams extends BaseParams {
    userId?: number | null
}

interface PostRepository extends BaseRepository<Post, PostParams> {
    findMany(params: PostParams): Promise<PostsResponseDto>
    create(data: CreatePostDto): Promise<Post>
    findUser(userId: number): Promise<User | null>
}

export type { PostParams, PostRepository }
