import { IsUUID, IsString, IsOptional, IsDate, IsBoolean, Length } from 'class-validator';

export class CreateAuditlogDto {
    @IsUUID()
    url_id: string;

    @IsString()
    @Length(1, 50)
    action: string;

    @IsUUID()
    changed_by: string;

    @IsOptional()
    @IsDate()
    change_date?: Date;

    @IsOptional()
    @IsString()
    details?: string;

    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;

    @IsOptional()
    @IsDate()
    deleted_at?: Date | null;

    @IsOptional()
    @IsBoolean()
    is_deleted?: boolean;
}
