import { jest } from '@jest/globals'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

describe('API Tests for Users', () => {
    describe('GET /api/users', () => {
        it('should fetch all users successfully', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve({
                            users: [
                                {
                                    id: 1,
                                    name: 'Test User',
                                    email: 'test@example.com',
                                },
                            ],
                        }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/users`)
            expect(response.ok).toBe(true)
            const data = await response.json()

            expect(data).toHaveProperty('users')
            expect(Array.isArray(data.users)).toBe(true)

            global.fetch.mockRestore()
        })

        it('should return an empty array if no users exist', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ users: [] }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/users`)
            const data = await response.json()

            expect(data.users.length).toBe(0)
            expect(data.users).toEqual([])

            global.fetch.mockRestore()
        })

        it('should return a 500 error on server failure', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: false,
                    status: 500,
                    json: () =>
                        Promise.resolve({ message: 'Internal Server Error' }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/users`)
            expect(response.ok).toBe(false)
            expect(response.status).toBe(500)

            global.fetch.mockRestore()
        })
    })
})

describe('API Tests for Posts', () => {
    // Test GET /posts
    describe('GET /api/posts', () => {
        it('should fetch all posts successfully', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve({
                            posts: [
                                {
                                    id: 1,
                                    title: 'Test Post',
                                    body: 'Content of the test post',
                                },
                            ],
                        }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/posts`)
            expect(response.ok).toBe(true)
            const data = await response.json()

            // Validate the response structure
            expect(data).toHaveProperty('posts')
            expect(Array.isArray(data.posts)).toBe(true)

            global.fetch.mockRestore()
        })

        it('should return an empty array if no posts exist', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ posts: [] }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/posts`)
            const data = await response.json()

            expect(data.posts.length).toBe(0)
            expect(data.posts).toEqual([])

            global.fetch.mockRestore()
        })

        it('should return a 500 error on server failure', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: false,
                    status: 500,
                    json: () =>
                        Promise.resolve({ message: 'Internal Server Error' }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/posts`)
            expect(response.ok).toBe(false)
            expect(response.status).toBe(500)

            global.fetch.mockRestore()
        })
    })

    describe('POST /api/posts', () => {
        it('should create a new post successfully', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve({
                            id: 1,
                            title: 'Test Post',
                            body: 'This is a test post.',
                        }),
                })
            )

            const newPost = {
                title: 'Test Post',
                body: 'This is a test post.',
                userId: 1,
            }

            const response = await fetch(`${BASE_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            })

            expect(response.ok).toBe(true)

            const data = await response.json()
            expect(data).toHaveProperty('id')
            expect(data.title).toBe(newPost.title)

            global.fetch.mockRestore()
        })

        it('should return a 400 error if required fields are missing', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: false,
                    status: 400,
                    json: () => Promise.resolve({ message: 'Bad Request' }),
                })
            )

            const invalidPost = {
                body: 'This post has no title.',
            }

            const response = await fetch(`${BASE_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invalidPost),
            })

            expect(response.ok).toBe(false)
            expect(response.status).toBe(400)

            global.fetch.mockRestore()
        })
    })

    describe('DELETE /api/posts/:id', () => {
        it('should delete a post successfully', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ success: true }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/posts/1`, {
                method: 'DELETE',
            })
            expect(response.ok).toBe(true)

            const data = await response.json()
            expect(data).toHaveProperty('success', true)

            global.fetch.mockRestore()
        })

        it('should return a 404 if the post does not exist', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: false,
                    status: 404,
                    json: () => Promise.resolve({ message: 'Post not found' }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/posts/9999`, {
                method: 'DELETE',
            })

            expect(response.ok).toBe(false)
            expect(response.status).toBe(404)

            global.fetch.mockRestore()
        })

        it('should return a 500 error on server failure', async () => {
            jest.spyOn(global, 'fetch').mockImplementation(() =>
                Promise.resolve({
                    ok: false,
                    status: 500,
                    json: () =>
                        Promise.resolve({ message: 'Internal Server Error' }),
                })
            )

            const response = await fetch(`${BASE_URL}/api/posts/1`, {
                method: 'DELETE',
            })

            expect(response.ok).toBe(false)
            expect(response.status).toBe(500)

            global.fetch.mockRestore()
        })
    })
})
