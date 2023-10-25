import { RegisterUserDto, UserCredentialsDto } from 'src/domain/user/dtos';

export abstract class IAuthUseCases {
    abstract register(user: RegisterUserDto);
    abstract login(user: UserCredentialsDto);
}
