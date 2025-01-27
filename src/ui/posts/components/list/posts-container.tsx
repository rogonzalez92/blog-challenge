'use client'

import React, {
    Suspense,
    useTransition,
    useState,
    useEffect,
    lazy,
} from 'react'
import { useRouter } from 'next/navigation'
import { useRepository } from '@/ui/providers'
import { useToast } from '@/ui/shared/hooks'
import { Spinner } from '@/ui/shared/components/spinner'
import { Toast } from '@/ui/shared/components/toast'
import { User } from '@/core/domain/entities'
import { PostsResponseDto } from '@/core/dtos'
import { EmptyState } from '@/ui/shared/components/empty-state'

export const revalidate = 0

export default function PostsPage({
    initialPage,
    initialUserId,
}: {
    initialPage: number
    initialUserId: number | null
}) {
    const SearchForm = lazy(() => import('../search/search-form'))
    const PostsList = lazy(() => import('./posts-list'))
    const Pagination = lazy(() => import('./pagination'))

    const router = useRouter()
    const { posts, users } = useRepository()
    const { message, type, showToast } = useToast()
    const [selectedUserId, setSelectedUserId] = useState(initialUserId || null)
    const [isPending, startTransition] = useTransition()
    const [usersList, setUsersList] = useState<User[]>([])
    const [postsResponse, setPostsResponse] = useState<PostsResponseDto>({
        data: [],
        currentPage: 1,
        totalPages: 1,
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await users.getAll()
                setUsersList(data)
            } catch (error) {
                console.error('Failed to fetch users:', error)
                showToast('Failed to fetch users', 'error')
                setUsersList([])
            }
        }
        fetchUsers()
    }, [users, showToast])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await posts.getAll({
                    page: initialPage,
                    userId: selectedUserId,
                })
                setPostsResponse(data)
            } catch (error) {
                console.error('Failed to fetch posts:', error)
                showToast('Failed to fetch posts', 'error')
                setPostsResponse({ data: [], currentPage: 1, totalPages: 1 })
            }
        }
        fetchPosts()
    }, [posts, initialPage, selectedUserId, showToast])

    const handleQueryChange = (newUserId: number | null) => {
        setSelectedUserId(newUserId)
        startTransition(() => {
            router.push(
                `/posts?${new URLSearchParams({
                    ...(newUserId && { userId: newUserId.toString() }),
                    page: '1',
                })}`
            )
        })
    }

    const handleDelete = async (postId: number) => {
        const result = await posts.delete(postId)
        if (result === 'success') {
            showToast('Post deleted successfully!', 'success')
            startTransition(() => {
                router.refresh()
            })
        } else {
            showToast('Failed to delete post', 'error')
        }
    }

    const changePage = (newPage: number) => {
        startTransition(() => {
            const params = new URLSearchParams()
            if (selectedUserId) {
                params.set('userId', selectedUserId.toString())
            }
            params.set('page', newPage.toString())
            router.replace(`/posts?${params}`, { scroll: false })
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<Spinner />}>
                <SearchForm
                    users={usersList}
                    selectedUserId={selectedUserId}
                    onQueryChange={handleQueryChange}
                />
                <Toast message={message} type={type} />

                {isPending ? (
                    <div className="mt-8">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <PostsList
                            posts={postsResponse.data}
                            onDelete={handleDelete}
                        />
                        {postsResponse.data.length > 0 ? (
                            <Pagination
                                currentPage={initialPage}
                                totalPages={postsResponse.totalPages}
                                onPageChange={changePage}
                            />
                        ) : (
                            <EmptyState message="The list of posts is empty." />
                        )}
                    </>
                )}
            </Suspense>
        </div>
    )
}
