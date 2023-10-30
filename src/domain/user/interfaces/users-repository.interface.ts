import { RegisterUserDto, UpdateUserDto } from 'src/domain/user/dtos';
import { User } from 'src/domain/user/entities';

export abstract class IUsersRepository {
    abstract createOne(user: RegisterUserDto): Promise<User>;
    abstract updateOne(id: number, user: UpdateUserDto): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract findOneByEmail(email: string): Promise<User | null>;
    abstract findOne(id: number): Promise<User>;
    abstract remove(id: number): Promise<void>;
}
