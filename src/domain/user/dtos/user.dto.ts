import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    IsUUID,
} from 'class-validator';

export class UserDto {
    @IsUUID()
    id: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    nickName?: string;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    password: string;
}
