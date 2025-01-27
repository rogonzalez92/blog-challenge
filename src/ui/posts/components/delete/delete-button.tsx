'use client'

import React, { useState, lazy } from 'react'

interface DeleteButtonProps {
    postId: number
    onDelete: (postId: number) => void
}

const ConfirmationModal = lazy(
    () => import('@ui/shared/components/confirmation-modal')
)

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId, onDelete }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleClick = async () => {
        if (isDeleting) return
        setIsDeleting(true)
        try {
            await onDelete(postId)
        } finally {
            setIsDeleting(false)
            setModalOpen(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className={`bg-red-500 text-white px-4 py-2 rounded ${
                    isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            {isModalOpen && (
                <ConfirmationModal
                    title="Delete Post"
                    message="Are you sure you want to delete this post?"
                    onConfirm={handleClick}
                    onCancel={() => setModalOpen(false)}
                />
            )}
        </>
    )
}

export default DeleteButton
