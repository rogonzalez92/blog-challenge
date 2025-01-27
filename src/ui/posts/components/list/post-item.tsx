import { Post } from '@/core/domain/entities'
import DeleteButton from '../delete/delete-button'

export default function PostItem({
    post,
    onDelete,
}: {
    post: Post
    onDelete: (postId: number) => void
}) {
    const date = new Date(post.createdAt)
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{formattedDate}</p>
            <p>{post.body}</p>
            {post.user && (
                <p className="text-xl font-semibold mb-2">
                    Written by {post.user.name}
                </p>
            )}
            <span className="flex justify-end space-x-2">
                <DeleteButton postId={post.id} onDelete={onDelete} />
            </span>
        </div>
    )
}
