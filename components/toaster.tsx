'use client'

import React from 'react'

interface ToasterProps {
    message: string
    type: 'success' | 'error'
}

const Toaster: React.FC<ToasterProps> = ({ message, type }) => {
    const toasterClasses =
        type === 'success'
            ? 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg'
            : 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg'

    return (
        <div className={toasterClasses}>
            <p>{message}</p>
        </div>
    )
}

export default Toaster
