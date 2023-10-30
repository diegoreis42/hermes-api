import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/domain/auth/constants';
import { AuthController } from 'src/domain/auth/controllers';
import { IAuthService, IAuthUseCases } from 'src/domain/auth/interfaces';
import { AuthService } from 'src/domain/auth/services';
import { AuthUseCases } from 'src/domain/auth/usecases';
import { UserModule } from 'src/domain/user';

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expirationTime },
        }),
    ],
    providers: [
        {
            provide: IAuthUseCases,
            useClass: AuthUseCases,
        },
        {
            provide: IAuthService,
            useClass: AuthService,
        },
    ],
})
export class AuthModule {}
