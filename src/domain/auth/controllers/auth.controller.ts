import {
    Body,
    Controller,
    Get,
    Injectable,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth/guards';
import { IAuthUseCases } from 'src/domain/auth/interfaces';
import { RegisterUserDto, UserCredentialsDto } from 'src/domain/user/dtos';
import { GetUser } from 'src/shared/decorators';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Injectable()
@Controller('auth')
export class AuthController {
    constructor(private authUseCases: IAuthUseCases) {}

    @Post('register')
    register(@Body() body: RegisterUserDto) {
        return this.authUseCases.register(body);
    }

    @Post('login')
    login(@Body() body: UserCredentialsDto) {
        return this.authUseCases.login(body);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    me(@GetUser() user) {
        return user;
    }
}
