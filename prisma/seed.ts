import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { PrismaClient } from '@prisma/client'
import { Post, User } from '@/interfaces/postUser.interface'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
    try {
        const [usersResponse, postsResponse] = await Promise.all([
            fetch(process.env.USERS_API_URL || ''),
            fetch(process.env.POSTS_API_URL || ''),
        ])

        const users = (await usersResponse.json()) as User[]
        const posts = (await postsResponse.json()) as Post[]

        for (const user of users) {
            const userPosts = posts
                .filter((post: Post) => post.userId === user.id)
                .map((post: Post) => ({
                    title: post.title,
                    body: post.body,
                }))

            await prisma.user.create({
                data: {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    posts: {
                        create: userPosts,
                    },
                },
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error during data seeding:')
        console.error(`Name: ${error.name}`)
        console.error(`Message: ${error.message}`)
        console.error('Stack Trace:', error.stack)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
