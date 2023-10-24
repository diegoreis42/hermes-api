import { RegisterUserDto } from 'src/domain/user/dtos'

export abstract class IAuthUseCases {
    abstract register(user: RegisterUserDto)
}
