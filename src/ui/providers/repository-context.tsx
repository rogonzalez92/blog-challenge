'use client'

import React, { createContext, useContext } from 'react'
import prisma from '@/core/infrastructure/prisma/client'
import { PostUseCase } from '@/core/use-cases'
import { PrismaPostRepository } from '@/core/infrastructure/repositories'

interface RepositoryContextType {
    postUseCase: PostUseCase
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(
    undefined
)

export function RepositoryProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const postRepository = new PrismaPostRepository(prisma)
    const postUseCase = new PostUseCase(postRepository)

    const value = {
        postUseCase,
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
