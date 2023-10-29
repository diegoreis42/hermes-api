import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from 'src/domain/user/dtos';

export class ReturnUserDto extends OmitType(UserDto, ['password']) {}
