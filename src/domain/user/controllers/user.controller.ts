import { Delete, Injectable } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth';
import { UpdateUserDto } from 'src/domain/user/dtos';
import { IUsersRepository, IUsersUseCases } from 'src/domain/user/interfaces';
import { IdDto } from 'src/shared/dtos';

@Controller('user')
@Injectable()
export class UserController {
    constructor(
        private readonly userUseCases: IUsersUseCases,
        private readonly userRepository: IUsersRepository
    ) {}

    @Patch(':id')
    updateUser(@Param() userId: IdDto, @Body() updateDto: UpdateUserDto) {
        return this.userUseCases.editUser(userId.id, updateDto);
    }

    @Delete(':id')
    deleteUser(@Param() userId: IdDto) {
        return this.userRepository.remove(userId.id);
    }
}
