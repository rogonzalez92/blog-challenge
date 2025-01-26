'use client'

import { Post } from '@/core/domain/entities'
import PostItem from './post-item'
import { Spinner } from '@/ui/shared/components/spinner'

export default function PostsList({
    onDelete,
    posts,
    isLoading,
}: {
    onDelete: (postId: number, message: 'success' | 'error') => void
    posts: Post[]
    isLoading: boolean
}) {
    if (isLoading) {
        return <Spinner />
    }

    if (!posts || posts.length === 0) {
        return <p>The list of posts is empty.</p>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    )
}
