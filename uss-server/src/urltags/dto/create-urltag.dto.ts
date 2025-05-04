
import { IsNotEmpty, IsString, IsUUID, IsOptional, MaxLength } from 'class-validator';

export class CreateUrltagDto {
    @IsUUID()
    @IsOptional()
    user_id?: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    tag_name: string;
}
