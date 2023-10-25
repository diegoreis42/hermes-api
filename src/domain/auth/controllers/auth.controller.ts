import {
    Body,
    Controller,
    Injectable,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { IAuthUseCases } from 'src/domain/auth/interfaces';
import { RegisterUserDto } from 'src/domain/user/dtos';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Injectable()
@Controller('auth')
export class AuthController {
    constructor(private authUseCases: IAuthUseCases) {}

    @Post('register')
    register(@Body() body: RegisterUserDto) {
        return this.authUseCases.register(body);
    }
}
