'use client'

import { Post } from '@/interfaces/postUser.interface'
import PostItem from './post-item'

export default function PostsList({
    posts,
    onDelete,
}: {
    posts: Post[]
    onDelete: (postId: number, message: 'success' | 'error') => void
}) {
    if (!posts) {
        return null
    }
    if (posts.length === 0) {
        return <p>The list of posts is empty.</p>
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: Post) => (
                    <PostItem key={post.id} post={post} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    )
}
