import { Post } from '@/interfaces/postUser.interface'

export default function PostItem({ post }: { post: Post }) {
    return (
        <main>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            {post.user && <p>User Name: {post.user.name}</p>}
        </main>
    )
}
