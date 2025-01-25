'use client'

import { useState } from 'react'
import { Post } from '@/interfaces/postUser.interface'
import PostItem from './post-item'
import Toaster from './toaster'

export default function PostsList({ posts }: { posts: Post[] }) {
    const [postList, setPostList] = useState(posts)
    const [toasterMessage, setToasterMessage] = useState<string | null>(null)
    const [toasterType, setToasterType] = useState<'success' | 'error' | null>(
        null
    )

    const handleDeletePost = (postId: number, message: string) => {
        if (message === 'success') {
            setPostList((prevPosts) =>
                prevPosts.filter((post) => post.id !== postId)
            )
            setToasterMessage('Post deleted successfully!')
            setToasterType('success')
        } else {
            setToasterMessage('Failed to delete post. Please try again.')
            setToasterType('error')
        }
        setTimeout(() => {
            setToasterMessage(null)
            setToasterType(null)
        }, 3000)
    }

    if (!posts) {
        return null
    }
    if (posts.length === 0) {
        return <p>The list of posts is empty.</p>
    }
    return (
        <div className="container mx-auto px-4 py-8">
            {toasterMessage && toasterType && (
                <Toaster message={toasterMessage} type={toasterType} />
            )}
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postList.map((post: Post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onDelete={handleDeletePost}
                    />
                ))}
            </ul>
        </div>
    )
}
