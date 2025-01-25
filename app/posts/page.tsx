import PostsPage from '@/components/posts-page'
import { Post, User } from '@/interfaces/postUser.interface'

export const revalidate = 0

export default async function Posts({
    searchParams,
}: {
    searchParams: { userId?: string }
}) {
    const queryParams = await searchParams
    const userId = queryParams?.userId ? Number(queryParams.userId) : null

    const posts: Post[] = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts${userId ? `?userId=${userId}` : ''}`,
        { cache: 'no-store' }
    ).then((res) => res.json())

    const users: User[] = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
            cache: 'force-cache',
        }
    ).then((res) => res.json())

    return <PostsPage posts={posts} users={users} />
}
