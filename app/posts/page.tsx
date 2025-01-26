import React, { Suspense } from 'react'
import PostsPage from '@/ui/posts/components/list/posts-page'
import { User } from '@/core/domain/entities'
import { PostsResponseDto } from '@/core/dtos'
import { Spinner } from '@/ui/shared/components/spinner'

export const revalidate = 0

export default async function Posts({
    searchParams,
}: {
    searchParams: { userId?: string; page?: string }
}) {
    const queryParams = await searchParams
    const userId = queryParams?.userId ? Number(queryParams.userId) : null
    const page = queryParams?.page ? Number(queryParams.page) : 1

    const postsData: Promise<PostsResponseDto> = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}${userId ? `&userId=${userId}` : ''}`,
        { cache: 'no-store' }
    )
        .then((res) => res.json())
        .then(async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate delay for testing purposes
            return data
        })

    const usersData: Promise<User[]> = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        { cache: 'force-cache' }
    ).then((res) => res.json())

    return (
        <>
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl text-center font-bold text-gray-800">
                        POST CHALLENGE
                    </h1>
                </div>
            </header>
            <Suspense fallback={<Spinner />}>
                <PostsPage postsData={postsData} usersData={usersData} />
            </Suspense>
        </>
    )
}
