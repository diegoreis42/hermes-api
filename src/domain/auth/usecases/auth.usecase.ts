import { Injectable } from '@nestjs/common';
import { IAuthUseCases } from 'src/domain/auth/interfaces';
import { RegisterUserDto } from 'src/domain/user/dtos';
import { IUsersRepository, IUsersServices } from 'src/domain/user/interfaces';
import * as bcrypt from 'bcrypt';
import { AuthEnum } from 'src/domain/auth/enums';

@Injectable()
export class AuthUseCases implements IAuthUseCases {
    constructor(
        private usersService: IUsersServices,
        private usersRepository: IUsersRepository
    ) {}

    async register(user: RegisterUserDto) {
        await this.usersService.verifyEmailExists(user.email);

        const newUser = await this.usersRepository.createOne({
            ...user,
            password: await bcrypt.hash(
                user.password,
                AuthEnum.HASH_SALT_ROUND
            ),
        });

        // retornar access token
    }
}
