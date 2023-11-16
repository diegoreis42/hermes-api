import { UpdateUserDto } from 'src/domain/user/dtos';

export abstract class IUsersUseCases {
    abstract editUser(id: number, updateUser: UpdateUserDto);
}
