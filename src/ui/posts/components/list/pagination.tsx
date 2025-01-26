'use client'

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number
    totalPages: number
    onPageChange: (newPage: number) => void
}) {
    if (totalPages === 0) return null

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="flex justify-center mt-6">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={page === currentPage}
                    className={`px-3 py-1 mx-1 border rounded ${
                        page === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-white'
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}
