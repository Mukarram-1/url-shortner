//manage user role dto

import { Role } from 'src/enums/role.enum';
import { IsEnum, IsNotEmpty, IsString, MinLength, } from 'class-validator';
export class ManageUserRoleDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsEnum(Role)
    @IsNotEmpty()
    old_role_id: Role;
    @IsEnum(Role)
    @IsNotEmpty()
    new_role_id: Role;
}