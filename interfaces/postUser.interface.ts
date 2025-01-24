interface Post {
    userId: number | null
    id: number
    title: string
    body: string
}

interface User {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

interface PostsPageProps {
    users: User[]
    posts: Post[]
    error?: string
}

export type { User, Post, PostsPageProps }
