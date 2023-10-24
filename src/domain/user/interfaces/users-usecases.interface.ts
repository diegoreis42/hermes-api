import { RegisterUserDto } from 'src/domain/user/dtos'

export abstract class IUsersUseCases {
    abstract register(user: RegisterUserDto)
}
