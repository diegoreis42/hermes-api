import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RegisterUserDto, UserDto } from 'src/domain/user/dtos'
import { User } from 'src/domain/user/entities'
import { IUsersService } from 'src/domain/user/interfaces'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    createOne(user: RegisterUserDto): Promise<User> {
        return this.usersRepository.save(this.usersRepository.create(user))
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email: email } })
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id)
    }
}
