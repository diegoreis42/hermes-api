import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUsersRepository, IUsersServices } from 'src/domain/user/interfaces';

@Injectable()
export class UsersServices implements IUsersServices {
    constructor(private usersRepository: IUsersRepository) {}

    async verifyEmailExists(email: string): Promise<Boolean> {
        const user = await this.usersRepository.findOneByEmail(email);

        if (user) {
            throw new HttpException(
                'Email ja cadastrado!',
                HttpStatus.BAD_REQUEST
            );
        }

        return false;
    }
}
