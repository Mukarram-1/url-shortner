
import { IsNotEmpty, IsString, MinLength, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class UpdateUrltagDto {


    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    tag_name: string;
}

