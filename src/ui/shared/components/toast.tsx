import React from 'react'

interface ToastProps {
    message: string | null
    type: 'success' | 'error' | null
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
    if (!message || !type) return null

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'

    return (
        <div
            className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded shadow-lg`}
        >
            {message}
        </div>
    )
}
