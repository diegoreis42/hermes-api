import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/domain/auth/constants';
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

    async verify(token): Promise<string> {
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            return payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    extractTokenFromHeader(req): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
