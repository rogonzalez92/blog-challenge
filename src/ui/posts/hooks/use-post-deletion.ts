import { useState } from 'react'
import { PostUseCase } from '@/core/use-cases'

export const usePostDeletion = (postUseCase: PostUseCase) => {
    const [isLoading, setIsLoading] = useState(false)

    const deletePost = async (postId: number): Promise<'success' | 'error'> => {
        try {
            setIsLoading(true)
            const success = await postUseCase.deletePost(postId)
            return success ? 'success' : 'error'
        } catch (err) {
            console.error('Delete error:', err)
            return 'error'
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        deletePost,
    }
}
