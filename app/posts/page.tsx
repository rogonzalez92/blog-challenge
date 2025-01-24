import PostsList from '@/components/postsList'
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
            <PostsList posts={posts} />
        </>
    )
}
