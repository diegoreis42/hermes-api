import { PickType } from '@nestjs/mapped-types';
import { UserDto } from 'src/domain/user/dtos/user.dto';

export class RegisterUserDto extends PickType(UserDto, [
    'email',
    'password',
    'name',
]) {}
