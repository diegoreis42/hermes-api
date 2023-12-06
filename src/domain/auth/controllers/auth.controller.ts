import {
    Body,
    Controller,
    Get,
    HttpCode,
    Injectable,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth/guards';
import { IAuthUseCases } from 'src/domain/auth/interfaces';
import {
    RegisterUserDto,
    UpdateUserPassword,
    UserCredentialsDto,
} from 'src/domain/user/dtos';
import { GetUser } from 'src/shared/decorators';
import { IdDto } from 'src/shared/dtos';

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
    @HttpCode(200)
    login(@Body() body: UserCredentialsDto) {
        return this.authUseCases.login(body);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    me(@GetUser() user) {
        return user;
    }

    @Patch(':id/reset-password')
    @UseGuards(AuthGuard)
    resetPassword(@Param() id , @Body() userDto: UpdateUserPassword) {
        return this.authUseCases.resetPassword(id.id, userDto);
    }
}
