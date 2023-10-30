import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth/guards';
import { GetUser } from 'src/shared/decorators';

@Controller('user')
export class UserController {}
