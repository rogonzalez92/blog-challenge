'use client'

import React, { useState, lazy } from 'react'
import { usePostDeletion } from '@ui/posts/hooks'
import { useRepository } from '@/ui/providers'

interface DeleteButtonProps {
    postId: number
    onDelete: (postId: number, message: 'success' | 'error') => void
}

const ConfirmationModal = lazy(
    () => import('@ui/shared/components/confirmation-modal')
)

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId, onDelete }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const { postUseCase } = useRepository()
    const { deletePost, isLoading } = usePostDeletion(postUseCase)

    const handleDelete = async () => {
        const result = await deletePost(postId)
        onDelete(postId, result)
        setModalOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                disabled={isLoading}
            >
                {isLoading ? 'Deleting...' : 'Delete'}
            </button>
            {isModalOpen && (
                <ConfirmationModal
                    title="Delete Post"
                    message="Are you sure you want to delete this post?"
                    onConfirm={handleDelete}
                    onCancel={() => setModalOpen(false)}
                />
            )}
        </>
    )
}

export default DeleteButton
