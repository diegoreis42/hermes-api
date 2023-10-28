import { UserCredentialsDto, UserDto } from 'src/domain/user/dtos';

export abstract class IAuthService {
    abstract createAccessToken(user: UserDto);
}
