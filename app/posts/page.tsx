import PostsList from '@/components/posts-list'
import { Post } from '@/interfaces/postUser.interface'

export const revalidate = 0

export default async function Posts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`)
    if (!res.ok) {
        throw new Error('Failed to fetch posts')
    }
    const posts: Post[] = await res.json()

    return (
        <>
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl text-center font-bold text-gray-800">
                        POST CHALLENGE
                    </h1>
                </div>
            </header>

            <PostsList posts={posts} />
        </>
    )
}
