import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DomainModule } from 'src/domain'
import { User } from 'src/domain/user/entities'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'pass123',
            database: 'test',
            entities: [User],
            synchronize: true,
        }),
        DomainModule,
    ],
})
export class AppModule {}
