import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAuthService, IAuthUseCases } from 'src/domain/auth/interfaces';
import {
    RegisterUserDto,
    UpdateUserDto,
    UserCredentialsDto,
} from 'src/domain/user/dtos';
import { IUsersRepository, IUsersServices } from 'src/domain/user/interfaces';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AuthEnum, AuthErrorsEnum } from 'src/domain/auth/enums';

@Injectable()
export class AuthUseCases implements IAuthUseCases {
    constructor(
        private usersService: IUsersServices,
        private usersRepository: IUsersRepository,
        private authService: IAuthService
    ) {}

    async register(user: RegisterUserDto) {
        await this.usersService.verifyEmailExists(user.email);
        const recoveryKey = crypto
            .randomBytes(32)
            .toString('hex')
            .substring(0, 7);

        const { password, ...newUser } = await this.usersRepository.createOne({
            ...user,
            password: await bcrypt.hash(
                user.password,
                AuthEnum.HASH_SALT_ROUND
            ),
            recoveryKey: await bcrypt.hash(
                recoveryKey,
                AuthEnum.HASH_SALT_ROUND
            ),
        });

        const access_token = await this.authService.createAccessToken(newUser);

        return { access_token, recoveryKey };
    }

    async login(user: UserCredentialsDto) {
        const { password, ...authUser } = await this.usersService.findByEmail(
            user.email
        );

        if (await bcrypt.compare(user.password, password))
            return this.authService.createAccessToken(authUser);

        throw new HttpException(
            AuthErrorsEnum.WRONG_PASSWORD,
            HttpStatus.BAD_REQUEST
        );
    }

    async resetPassword(id: number, user: UpdateUserDto) {
        const authUser = await this.usersService.findById(id);

        if (await bcrypt.compare(user.recoveryKey, authUser.recoveryKey))
            throw new HttpException(
                AuthErrorsEnum.WRONG_PASSWORD,
                HttpStatus.UNAUTHORIZED
            );

        if (await bcrypt.compare(user.password, authUser.password))
            throw new HttpException(
                AuthErrorsEnum.SAME_PASSWORD,
                HttpStatus.BAD_REQUEST
            );

        const { password, ...updatedUser } =
            await this.usersRepository.updateOne(id, {
                ...user,
                password: await bcrypt.hash(
                    user.password,
                    AuthEnum.HASH_SALT_ROUND
                ),
            });

        return updatedUser;
    }
}
