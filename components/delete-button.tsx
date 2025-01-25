'use client'

import React, { useState } from 'react'
import ConfirmationModal from './confirmation-modal'

interface DeleteButtonProps {
    postId: number
    onDelete: (postId: number, message: string) => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId, onDelete }) => {
    const [isModalOpen, setModalOpen] = useState(false)

    const handleDelete = async () => {
        try {
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
            setModalOpen(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500 transition"
            >
                Delete
            </button>
            {isModalOpen && (
                <ConfirmationModal
                    message="Are you sure you want to delete this post?"
                    onConfirm={handleDelete}
                    onCancel={() => setModalOpen(false)}
                />
            )}
        </>
    )
}

export default DeleteButton
