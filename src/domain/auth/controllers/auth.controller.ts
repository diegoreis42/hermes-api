import {
    Body,
    Controller,
    Injectable,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { RegisterUserDto } from 'src/domain/user/dtos'
import { IUsersUseCases } from 'src/domain/user/interfaces'

@UsePipes(new ValidationPipe({ whitelist: true }))
@Injectable()
@Controller('auth')
export class AuthController {
    constructor(private usersUseCases: IUsersUseCases) {}

    @Post('register')
    register(@Body() body: RegisterUserDto) {
        return this.usersUseCases.register(body)
    }
}
