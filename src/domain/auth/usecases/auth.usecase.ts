import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAuthService, IAuthUseCases } from 'src/domain/auth/interfaces';
import { RegisterUserDto, UserCredentialsDto } from 'src/domain/user/dtos';
import { IUsersRepository, IUsersServices } from 'src/domain/user/interfaces';
import * as bcrypt from 'bcrypt';
import { AuthEnum } from 'src/domain/auth/enums';

@Injectable()
export class AuthUseCases implements IAuthUseCases {
    constructor(
        private usersService: IUsersServices,
        private usersRepository: IUsersRepository,
        private authService: IAuthService
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

        return this.authService.createAccessToken(newUser);
    }

    async login(user: UserCredentialsDto) {
        const authUser = await this.usersService.findByEmail(user.email);
        if (await bcrypt.compare(user.password, authUser.password))
            return this.authService.createAccessToken(authUser);

        throw new HttpException('Senha incorreta', HttpStatus.BAD_REQUEST);
    }
}
