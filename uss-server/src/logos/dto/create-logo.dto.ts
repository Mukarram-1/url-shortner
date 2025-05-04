import { IsUUID, IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateLogoDto {
    @IsUUID()
    user_id: string;

    @IsString()
    logo_path: string;

    @IsOptional()
    @IsDateString()
    created_at?: Date;

    @IsOptional()
    @IsDateString()
    updated_at?: Date;

    @IsOptional()
    @IsDateString()
    deleted_at?: Date;

    @IsOptional()
    @IsBoolean()
    is_deleted?: boolean;
}
