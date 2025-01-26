import { User } from '@/core/domain/entities'

export interface UserRepository {
    findAll(): Promise<User[]>
}
