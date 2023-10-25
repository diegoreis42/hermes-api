import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities';
import {
    IUsersRepository,
    IUsersServices,
    IUsersUseCases,
} from 'src/domain/user/interfaces';
import { UsersRepository } from 'src/domain/user/repository';
import { UsersServices } from 'src/domain/user/services';
import { UsersUseCase } from 'src/domain/user/usecases';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule, IUsersServices, IUsersRepository],
    providers: [
        {
            provide: IUsersUseCases,
            useClass: UsersUseCase,
        },
        {
            provide: IUsersRepository,
            useClass: UsersRepository,
        },
        {
            provide: IUsersServices,
            useClass: UsersServices,
        },
    ],
})
export class UserModule {}
