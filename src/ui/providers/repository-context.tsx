'use client'

import React, { createContext, useContext } from 'react'
import { PostsResponseDto } from '@/core/dtos'
import { User } from '@/core/domain/entities'
import { ApiError } from '@/core/errors/api.error'

interface PostOperations {
    delete: (id: number) => Promise<'success' | 'error'>
    getAll: (params: {
        page: number
        userId?: number | null
    }) => Promise<PostsResponseDto>
}

interface UserOperations {
    getAll: () => Promise<User[]>
}

interface RepositoryContextType {
    posts: PostOperations
    users: UserOperations
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(
    undefined
)

export function RepositoryProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const fetchPosts = async (params: {
        page: number
        userId?: number | null
    }) => {
        try {
            const queryParams = new URLSearchParams()
            if (params.userId)
                queryParams.set('userId', params.userId.toString())
            queryParams.set('page', params.page.toString())
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?${queryParams}`
            )
            if (!response.ok) {
                throw new ApiError(response.status, 'Failed to fetch posts')
            }
            return response.json() as Promise<PostsResponseDto>
        } catch (error) {
            if (error instanceof ApiError) throw error
            throw new ApiError(500, 'Failed to fetch posts')
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
            )
            if (!response.ok) {
                throw new ApiError(response.status, 'Failed to fetch users')
            }
            const data = await response.json()
            return data.users || []
        } catch (error) {
            if (error instanceof ApiError) throw error
            throw new ApiError(500, 'Failed to fetch users')
        }
    }

    const posts: PostOperations = {
        delete: async (postId) => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
                    {
                        method: 'DELETE',
                    }
                )

                if (!response.ok) {
                    throw new ApiError(response.status, 'Failed to delete post')
                }
                const data = await response.json()

                return data.success ? 'success' : 'error'
            } catch (error) {
                console.error(
                    'Delete error:',
                    error instanceof ApiError ? error.message : error
                )
                return 'error'
            }
        },
        getAll: fetchPosts,
    }

    const users: UserOperations = {
        getAll: fetchUsers,
    }

    const value = {
        posts,
        users,
    }

    return (
        <RepositoryContext.Provider value={value}>
            {children}
        </RepositoryContext.Provider>
    )
}

export function useRepository() {
    const context = useContext(RepositoryContext)
    if (context === undefined) {
        throw new Error(
            'useRepository must be used within a RepositoryProvider'
        )
    }
    return context
}
