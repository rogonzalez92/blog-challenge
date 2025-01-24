import { Post } from '@/interfaces/postUser.interface'
import PostItem from './postItem'

export default function PostsList({ posts }: { posts: Post[] }) {
    if (!posts) {
        return null
    }
    if (posts.length === 0) {
        return <p>There list of posts is empty.</p>
    }
    return (
        <ul>
            {posts.map((post: Post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </ul>
    )
}
