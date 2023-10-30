import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserDto } from 'src/domain/user/dtos/user.dto';


export class UpdateUserDto extends PartialType(OmitType(UserDto, ['id'])){}