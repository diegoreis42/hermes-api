import { Injectable } from '@nestjs/common'
import { IUsersService, IUsersUseCases } from 'src/domain/user/interfaces'

@Injectable()
export class UsersUseCase implements IUsersUseCases {
    constructor(private readonly userService: IUsersService) {}
}
