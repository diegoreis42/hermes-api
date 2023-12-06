import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto, UpdateUserDto } from 'src/domain/user/dtos';
import { User } from 'src/domain/user/entities';
import { IUsersRepository as IUsersRepository } from 'src/domain/user/interfaces';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    createOne(user: RegisterUserDto): Promise<User> {
        return this.usersRepository.save(this.usersRepository.create(user));
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email: email } });
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
    }

    updateOne(id: number, userName: UpdateUserDto): Promise<UpdateResult> {
        return this.usersRepository.update(id, { name: userName.name });
    }

    update(id: number, user) {
        return this.usersRepository.update(id, user);
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
