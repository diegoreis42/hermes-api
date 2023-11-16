import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';


export class IdDto {
    @IsUUID()
    @Type(() => Number)
    id: number;
}