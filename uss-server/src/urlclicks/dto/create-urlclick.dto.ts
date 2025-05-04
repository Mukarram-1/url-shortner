import { IsUUID, IsString, IsOptional, IsDateString, IsBoolean, IsIP, MaxLength } from 'class-validator';

export class CreateUrlClickDto {
    @IsString()
    @IsUUID()
    url_id: string;

    @IsDateString()
    access_date: string;

    @IsDateString()
    access_time: string;

    @IsIP()
    ip_address: string;

    @IsString()
    user_agent: string;

    @IsOptional()
    @IsString()
    referrer?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    country?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    city?: string;

    @IsOptional()
    @IsDateString()
    deleted_at?: string;


    @IsOptional()
    @IsBoolean()
    is_deleted?: boolean;
}