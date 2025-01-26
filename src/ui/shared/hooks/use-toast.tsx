import { useState, useCallback } from 'react'

type ToastType = 'success' | 'error' | null

export const useToast = () => {
    const [message, setMessage] = useState<string | null>(null)
    const [type, setType] = useState<ToastType>(null)

    const showToast = useCallback((newMessage: string, newType: 'success' | 'error') => {
        setMessage(newMessage)
        setType(newType)
        setTimeout(() => {
            setMessage(null)
            setType(null)
        }, 3000)
    }, [])

    return { message, type, showToast }
}