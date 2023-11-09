import { PickType } from '@nestjs/mapped-types';
import { UserDto } from 'src/domain/user/dtos/user.dto';

export class UserMessageDto extends PickType(UserDto, ['name', 'nickName']) {}
