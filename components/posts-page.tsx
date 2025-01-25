'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PostsList from '@/components/posts-list'
import SearchForm from '@/components/search-form'
import Pagination from '@/components/pagination'
import { ResponseData, User } from '@/interfaces/postUser.interface'
import Toaster from './toaster'

export default function PostsPage({
    postsData,
    usersData,
}: {
    postsData: Promise<ResponseData>
    usersData: Promise<User[]>
}) {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useTransition()
    const { posts, totalPages, currentPage } = React.use(postsData)
    const [selectedUserId, setSelectedUserId] = useState(
        Number(searchParams.get('userId')) || null
    )
    const users = React.use(usersData)
    const [postsListData, setPostListData] = useState(posts)
    const [toasterMessage, setToasterMessage] = useState<string | null>(null)
    const [toasterType, setToasterType] = useState<'success' | 'error' | null>(
        null
    )

    useEffect(() => {
        setPostListData(posts)
    }, [posts])

    const router = useRouter()

    const handleQueryChange = (newUserId: number | null) => {
        setIsLoading(() => {
            const params = new URLSearchParams()
            if (newUserId !== null) {
                params.set('userId', newUserId.toString())
            }
            params.set('page', '1')
            router.push(`/?${params.toString()}`)
        })
        setSelectedUserId(newUserId)
    }

    const changePage = (newPage: number) => {
        setIsLoading(() => {
            const params = new URLSearchParams(searchParams)
            params.set('page', newPage.toString())
            router.push(`?${params.toString()}`)
        })
    }

    const handleDelete = async (
        postId: number,
        message: 'success' | 'error'
    ) => {
        if (message === 'success') {
            setPostListData((prevPosts) =>
                prevPosts.filter((post) => post.id !== postId)
            )
            setToasterMessage('Post deleted successfully!')
            setToasterType('success')
            setIsLoading(() => {
                router.refresh()
            })
        } else {
            setToasterMessage('Failed to delete post. Please try again.')
            setToasterType('error')
        }
        setTimeout(() => {
            setToasterMessage(null)
            setToasterType(null)
        }, 3000)
    }

    return (
        <>
            <SearchForm
                users={users}
                onQueryChange={handleQueryChange}
                selectedUserId={Number(selectedUserId)}
            />
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <PostsList
                        key={JSON.stringify(postsListData)}
                        posts={postsListData}
                        onDelete={handleDelete}
                    />
                    {toasterMessage && toasterType && (
                        <Toaster message={toasterMessage} type={toasterType} />
                    )}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={changePage}
                    />
                </>
            )}
        </>
    )
}
