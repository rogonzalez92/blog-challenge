import { UserRepository } from '@/core/domain/repositories/user.repository'
import { UsersResponseDto } from '@/core/dtos/users.dto'

export class UserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async getUsers(): Promise<UsersResponseDto> {
        const users = await this.userRepository.findAll()
        return { users }
    }
}
