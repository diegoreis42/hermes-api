import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from 'src/domain/user/dtos/user.dto';

export class ReturnUserDto extends OmitType(UserDto, ['password']) {}
