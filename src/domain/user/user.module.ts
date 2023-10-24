import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/domain/user/entities'
import { IUsersService, IUsersUseCases } from 'src/domain/user/interfaces'
import { UsersService } from 'src/domain/user/services'
import { UsersUseCase } from 'src/domain/user/usecases'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule, IUsersUseCases],
    providers: [
        {
            provide: IUsersUseCases,
            useClass: UsersUseCase,
        },
        {
            provide: IUsersService,
            useClass: UsersService,
        },
    ],
})
export class UserModule {}
