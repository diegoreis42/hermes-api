import { Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';


export class IdDto {
    @IsUUID()
    id: number;
}