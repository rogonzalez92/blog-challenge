import { Post } from '@/interfaces/postUser.interface'
import prisma from '@/lib/prisma'

export default async function Posts() {
    const posts = await prisma.post.findMany()

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post: Post) => (
                    <li key={post.id}>
                        <span className="font-semibold">{post.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
