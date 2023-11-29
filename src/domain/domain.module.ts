import { Module } from '@nestjs/common';
import { AuthModule } from 'src/domain/auth';
import { UserModule } from 'src/domain/user';
import { MessageModule } from 'src/domain/message';

@Module({
    imports: [AuthModule, UserModule, MessageModule, MessageModule],
})
export class DomainModule {}
