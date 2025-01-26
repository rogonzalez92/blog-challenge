'use client'

import React, { useState, useTransition, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { User } from '@/core/domain/entities'
import { PostsResponseDto } from '@/core/dtos'
import { useToast } from '@/ui/shared/hooks'
import { Toast } from '@/ui/shared/components/toast'
import PostsList from './posts-list'
import Pagination from './pagination'
import SearchForm from '../search/search-form'
import { Spinner } from '@/ui/shared/components/spinner'

export default function PostsPage({
    postsData,
    usersData,
}: {
    postsData: Promise<PostsResponseDto>
    usersData: Promise<User[]>
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedUserId, setSelectedUserId] = useState(
        Number(searchParams.get('userId')) || null
    )
    const { message, type, showToast } = useToast()
    const [isLoading, setLoading] = useTransition()

    const { data, totalPages, currentPage } = React.use(postsData)
    const users = React.use(usersData)
    const [postListData, setPostListData] = useState(data)

    useEffect(() => {
        setPostListData(data)
    }, [data])

    const handleQueryChange = (newUserId: number | null) => {
        setSelectedUserId(newUserId)
        setLoading(() => {
            const params = new URLSearchParams()
            if (newUserId !== null) {
                params.set('userId', newUserId.toString())
            }
            params.set('page', '1')
            router.push(`/posts?${params.toString()}`)
        })
    }

    const changePage = (newPage: number) => {
        setLoading(() => {
            const params = new URLSearchParams(searchParams)
            params.set('page', newPage.toString())
            router.push(`?${params.toString()}`)
        })
    }

    const onDelete = (postId: number, message: 'success' | 'error') => {
        showToast('Post deleted successfully!', 'success')
        if (message === 'success') {
            setPostListData((prevPosts) =>
                prevPosts.filter((post) => post.id !== postId)
            )
            showToast('Post deleted successfully!', 'success')
            setLoading(() => router.refresh())
        } else {
            showToast('Failed to delete post. Please try again.', 'error')
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<Spinner />}>
                <SearchForm
                    users={users || []}
                    selectedUserId={selectedUserId}
                    onQueryChange={handleQueryChange}
                    isLoading={isLoading}
                />
                <Toast message={message} type={type} />
                <PostsList
                    posts={postListData}
                    onDelete={onDelete}
                    isLoading={isLoading}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={changePage}
                />
            </Suspense>
        </div>
    )
}
