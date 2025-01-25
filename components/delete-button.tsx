'use client'

import React, { useState, Suspense, lazy } from 'react'

interface DeleteButtonProps {
    postId: number
    onDelete: (postId: number, message: 'success' | 'error') => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId, onDelete }) => {
    const ConfirmationModal = lazy(() => import('./confirmation-modal'))
    const [isModalOpen, setModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                console.error('Failed to delete post')
                onDelete(postId, 'error')
            } else {
                onDelete(postId, 'success')
            }
        } catch (error) {
            console.error('An error occurred:', error)
            onDelete(postId, 'error')
        } finally {
            setIsDeleting(false)
            setModalOpen(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            {isModalOpen && (
                <Suspense
                    fallback={
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                        </div>
                    }
                >
                    <ConfirmationModal
                        message="Are you sure you want to delete this post?"
                        onConfirm={handleDelete}
                        onCancel={() => setModalOpen(false)}
                    />
                </Suspense>
            )}
        </>
    )
}

export default DeleteButton
