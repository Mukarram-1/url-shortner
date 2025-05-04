import { Injectable, InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { url, urlclick } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { UrlclicksService } from 'src/urlclicks/urlclicks.service';

@Injectable()
export class UrlRedirectMiddleware implements NestMiddleware {
    constructor(private readonly databaseService: DatabaseService, private urlclicksService: UrlclicksService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const short_url: string = req.params.url;
        let original: url | undefined;
        try {
            original = await this.databaseService.url.findUnique({ where: { short_url } });
            if (!original) {
                throw new InternalServerErrorException('URL NOT FOUND ON SERVER');
            }
        } catch (error) {
            console.error(error);
        }
        const currentDate: Date = new Date();
        let notExpired: boolean = true;
        if (original.expiration_date) {
            notExpired = currentDate < new Date(original.expiration_date);
        }

        if (original) {
            // save the info of this url click
            const urlClick: urlclick = await this.urlclicksService.create({
                url_id: original.url_id,
                access_date: currentDate.toISOString().split('T')[0], // Date part only (YYYY-MM-DD)
                access_time: new Date().toISOString(),
                ip_address: req.ip, // IP address as a string
                user_agent: req.headers['user-agent'] || '', // User-Agent string
                referrer: req.headers['referer'] || null, // Optional referer string

            });
            res.redirect(302, original.original_url);
        }
        else {
            next();
        }
        console.log('------');

    }
}
