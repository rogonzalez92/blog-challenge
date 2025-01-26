import { Post } from '../domain/entities'

export interface PostsResponseDto {
    data: Post[]
    totalPages: number
    currentPage: number
}
