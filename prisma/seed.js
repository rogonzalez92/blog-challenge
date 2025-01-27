import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config()

async function main() {
    try {
        const [usersResponse, postsResponse] = await Promise.all([
            fetch(process.env.USERS_API_URL || ''),
            fetch(process.env.POSTS_API_URL || ''),
        ])

        const users = await usersResponse.json()
        const posts = await postsResponse.json()

        for (const user of users) {
            const userPosts = posts
                .filter((post) => post.userId === user.id)
                .map((post) => ({
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
    } catch (error) {
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
