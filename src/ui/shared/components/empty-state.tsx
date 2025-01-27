interface EmptyStateProps {
    message: string
    icon?: React.ReactNode
}

export function EmptyState({ message, icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            {icon && <div className="mb-4">{icon}</div>}
            <p className="text-gray-500 text-lg">{message}</p>
        </div>
    )
}
