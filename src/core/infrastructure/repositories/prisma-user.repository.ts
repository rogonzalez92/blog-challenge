import { PrismaClient } from '@prisma/client'
import { UserRepository } from '@/core/domain/repositories/user.repository'
import { User } from '@/core/domain/entities'

export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaClient) {}

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            orderBy: { name: 'asc' },
        })
        return users as User[]
    }
}
