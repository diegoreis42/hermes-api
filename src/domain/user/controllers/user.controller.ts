import { Injectable } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth';
import { UpdateUserDto } from 'src/domain/user/dtos';
import { IUsersUseCases } from 'src/domain/user/interfaces';
import { IdDto } from 'src/shared/dtos';

@Controller('user')
@Injectable()
export class UserController {
    constructor(private readonly userUseCases: IUsersUseCases){}

    @Patch(':id/edit')
    @UseGuards(AuthGuard)
    updateUser(@Param() userId: IdDto, @Body() updateDto: UpdateUserDto){
        return this.userUseCases.editUser(userId.id, updateDto);
    }
}
