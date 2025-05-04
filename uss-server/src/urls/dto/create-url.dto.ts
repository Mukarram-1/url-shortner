import { statusenum, urltypeenum } from '@prisma/client';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateUrlDto {

    @IsUUID()
    @IsOptional()
    user_id?: string;

    @IsString()
    @IsOptional()
    original_url?: string; //[nullable]

    @IsEnum(urltypeenum)
    @IsOptional()
    url_type?: urltypeenum; //store,product, misc  [nullable]

    @IsBoolean()
    @IsOptional()
    associated?: boolean; //default = false //[nullable]

    @IsDateString()
    @IsOptional()

    expiration_date?: Date; //[nullable]

    @IsBoolean()
    @IsOptional()
    is_pre_generated?: boolean; //default = false //[nullable]

    @IsEnum(statusenum)
    @IsOptional()
    status?: statusenum; //default = active //[nullable]

    @IsInt()
    @IsOptional()
    logo_id?: number;

    @IsInt()
    @IsOptional()
    tag_id?: number;

}
