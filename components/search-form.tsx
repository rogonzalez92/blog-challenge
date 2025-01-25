'use client'

import { useState, useEffect } from 'react'
import Select from 'react-select'
import { User } from '@/interfaces/postUser.interface'

const SearchForm = ({
    users,
    onQueryChange,
    selectedUserId,
}: {
    users: User[]
    onQueryChange: (userId: number | null) => void
    selectedUserId: number | null
}) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleSelectChange = (
        option: { value: number; label: string } | null
    ) => {
        onQueryChange(option ? option.value : null)
    }

    const options = users.map((user) => ({
        value: user.id,
        label: user.name,
    }))

    return (
        <div className="flex justify-center items-center container mx-auto py-8">
            <Select
                value={
                    options.find((option) => option.value === selectedUserId) ||
                    null
                }
                onChange={handleSelectChange}
                options={options}
                isClearable
                placeholder="Select author..."
                className="w-full max-w-md px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

export default SearchForm
