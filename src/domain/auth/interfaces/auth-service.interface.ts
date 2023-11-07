import { ReturnUserDto } from 'src/domain/user/dtos';

export abstract class IAuthService {
    abstract createAccessToken(user: ReturnUserDto);
    abstract verify(token: string): Promise<string>;
}
