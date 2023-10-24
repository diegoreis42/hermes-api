import { Module } from '@nestjs/common'
import { AuthController } from 'src/domain/auth/controllers'
import { UserModule } from 'src/domain/user'

@Module({
    controllers: [AuthController],
    imports: [UserModule],
})
export class AuthModule {}
