'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import PostsList from '@/components/posts-list'
import SearchForm from '@/components/search-form'
import { Post, User } from '@/interfaces/postUser.interface'

export default function PostsPage({
    posts,
    users,
}: {
    posts: Post[]
    users: User[]
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentUserId = searchParams.get('userId')

    const handleQueryChange = (userId: number | null) => {
        const params = new URLSearchParams()
        if (userId !== null) {
            params.set('userId', userId.toString())
        }
        router.push(`?${params.toString()}`)
    }

    return (
        <>
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl text-center font-bold text-gray-800">
                        POST CHALLENGE
                    </h1>
                </div>
            </header>
            <SearchForm
                users={users}
                onQueryChange={handleQueryChange}
                selectedUserId={currentUserId ? Number(currentUserId) : null}
            />
            <PostsList key={JSON.stringify(posts)} posts={posts} />
        </>
    )
}
