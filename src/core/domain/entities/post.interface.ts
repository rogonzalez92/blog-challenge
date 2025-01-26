import { User } from './user.interface'

export interface Post {
    id: number
    title: string
    body: string
    userId: number | null
    createdAt: Date
    user?: User | null
}
