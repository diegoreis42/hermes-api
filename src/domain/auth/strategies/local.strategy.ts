import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthUseCases } from 'src/domain/auth/interfaces';
import { UserCredentialsDto } from 'src/domain/user/dtos';
import { User } from 'src/domain/user/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authUseCases: IAuthUseCases) {
        super();
    }

    async validate(user: UserCredentialsDto): Promise<User | null> {
        const authUser = await this.authUseCases.login(user);

        console.log(authUser);
        if (!authUser) {
            throw new UnauthorizedException();
        }

        return authUser;
    }
}
