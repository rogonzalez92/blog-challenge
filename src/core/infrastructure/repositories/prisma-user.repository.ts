import prisma from '@/core/infrastructure/prisma/client'
import { UserRepository } from '@/core/domain/repositories/user.repository'
import { User } from '@/core/domain/entities'

export class PrismaUserRepository implements UserRepository {
    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany({
            orderBy: { name: 'asc' },
        })
        return users as User[]
    }
}
