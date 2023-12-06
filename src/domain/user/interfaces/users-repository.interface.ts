import { RegisterUserDto, UpdateUserDto } from 'src/domain/user/dtos';
import { User } from 'src/domain/user/entities';
import { UpdateResult } from 'typeorm';

export abstract class IUsersRepository {
    abstract createOne(user: RegisterUserDto): Promise<User>;
    abstract updateOne(id: number, user: UpdateUserDto): Promise<UpdateResult>;
    abstract findAll(): Promise<User[]>;
    abstract findOneByEmail(email: string): Promise<User | null>;
    abstract findOne(id: number): Promise<User>;
    abstract remove(id: number);
    abstract update(id: number, user);
}
