import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/domain/user/dtos';

import {
    IUsersRepository,
    IUsersServices,
    IUsersUseCases,
} from 'src/domain/user/interfaces';

@Injectable()
export class UsersUseCase implements IUsersUseCases {
    constructor(
        private readonly userService: IUsersServices, 
        private readonly userRepository: IUsersRepository
    ) {}

    async editUser(id: number, updateUser: UpdateUserDto) {
        await this.userService.findById(id);

        return this.userRepository.updateOne(id, updateUser);
    }
}

