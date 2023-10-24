import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { IAuthUseCases } from 'src/domain/auth/interfaces'
import { RegisterUserDto } from 'src/domain/user/dtos'
import { IUsersService } from 'src/domain/user/interfaces'

@Injectable()
export class AuthUseCases implements IAuthUseCases {
    constructor(private userService: IUsersService) {}

    async register(user: RegisterUserDto) {
        const userExists = await this.userService.findOneByEmail(user.email)

        if (userExists) {
            throw new HttpException(
                'Usuario ja existe!',
                HttpStatus.BAD_REQUEST
            )
        }

        return this.userService.createOne(user)
    }
}
