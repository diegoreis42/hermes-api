import { Module } from '@nestjs/common';
import { AuthModule } from 'src/domain/auth';
import { UserModule } from 'src/domain/user';

@Module({
    imports: [AuthModule, UserModule],
})
export class DomainModule {}
