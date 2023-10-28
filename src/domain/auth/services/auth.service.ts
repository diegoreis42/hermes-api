import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from 'src/domain/auth/interfaces';
import { UserDto } from 'src/domain/user/dtos';

@Injectable()
export class AuthService implements IAuthService {
    constructor(private jwtService: JwtService) {}

    createAccessToken(user: UserDto) {
        return {
            access_token: this.jwtService.sign(
                JSON.parse(JSON.stringify(user))
            ),
        };
    }
}
