import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { apikey } from '@prisma/client';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
    constructor(private readonly databaseService: DatabaseService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        console.log('Headers:', request.headers);
        const apiKey: string[] | string = request.headers['x-api-key'];
        console.log('apiKey:', apiKey);
        const user_id: string | undefined = request['user'] ? request['user'].user_id : null;

        if (!apiKey) {
            throw new UnauthorizedException('API key is missing');
        }

        if (!user_id) {
            throw new UnauthorizedException('User ID is missing');
        }

        // Check in the database for the hashed API key
        const storedKey: apikey = await this.databaseService.apikey.findFirst({
            where: {
                user_id: user_id,
                is_deleted: false,
            },
        });

        if (!storedKey) {
            throw new UnauthorizedException('API key not found');
        }
        return true;
    }
}
