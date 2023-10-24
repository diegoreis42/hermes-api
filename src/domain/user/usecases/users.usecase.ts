import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RegisterUserDto, UserDto } from 'src/domain/user/dtos'
import { IUsersService, IUsersUseCases } from 'src/domain/user/interfaces'

@Injectable()
export class UsersUseCase implements IUsersUseCases {
    constructor(private readonly userService: IUsersService) {}

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
