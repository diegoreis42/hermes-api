import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/domain/user/entities'
import { IUsersRepository, IUsersUseCases } from 'src/domain/user/interfaces'
import { UsersService } from 'src/domain/user/repository'
import { UsersUseCase } from 'src/domain/user/usecases'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule, IUsersRepository],
    providers: [
        {
            provide: IUsersUseCases,
            useClass: UsersUseCase,
        },
        {
            provide: IUsersRepository,
            useClass: UsersService,
        },
    ],
})
export class UserModule {}
