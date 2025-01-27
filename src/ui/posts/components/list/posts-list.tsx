'use client'

import { Post } from '@/core/domain/entities'
import PostItem from './post-item'

interface PostsListProps {
    onDelete: (postId: number) => Promise<void>
    posts: Post[]
}

export default function PostsList({ onDelete, posts }: PostsListProps) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} onDelete={onDelete} />
            ))}
        </ul>
    )
}
