import React from 'react'
import PostsContainer from '@ui/posts/components/list/posts-container'

export const revalidate = 0

export default async function Posts({
    searchParams,
}: {
    searchParams: Promise<{ userId?: string; page?: string }>
}) {
    const resolvedSearchParams = await searchParams
    const userId = resolvedSearchParams?.userId
        ? Number(resolvedSearchParams.userId)
        : null
    const page = resolvedSearchParams?.page
        ? Number(resolvedSearchParams.page)
        : 1

    return (
        <>
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl text-center font-bold text-gray-800">
                        POST CHALLENGE
                    </h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <PostsContainer initialPage={page} initialUserId={userId} />
            </main>
        </>
    )
}
