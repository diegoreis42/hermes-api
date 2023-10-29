import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/entities';
import { UserErrorsEnum } from 'src/domain/user/enums';
import { IUsersRepository, IUsersServices } from 'src/domain/user/interfaces';

@Injectable()
export class UsersServices implements IUsersServices {
    constructor(private usersRepository: IUsersRepository) {}

    async verifyEmailExists(email: string): Promise<Boolean> {
        const user = await this.usersRepository.findOneByEmail(email);

        if (user) {
            throw new HttpException(
                UserErrorsEnum.EMAIL_ALREADY_EXISTS,
                HttpStatus.BAD_REQUEST
            );
        }

        return false;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOneByEmail(email);

        if (!user) {
            throw new HttpException(
                UserErrorsEnum.USER_NOT_EXISTS,
                HttpStatus.BAD_REQUEST
            );
        }

        return user;
    }
}
