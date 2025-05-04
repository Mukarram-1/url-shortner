import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { auditlog, Prisma, url, users } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UsersService } from 'src/users/users.service';
import { AuditlogsService } from 'src/auditlogs/auditlogs.service';

@Injectable()
export class UrlsService {
  constructor(private readonly databaseService: DatabaseService, private usersService: UsersService, private readonly auditlogsService: AuditlogsService) { }
  async create(username: string, createUrlDto: CreateUrlDto): Promise<url | undefined> {
    try {
      let foundInDB: url | undefined;
      let unique: string;
      do {
        unique = await this.generateUniquePattern();
        foundInDB = await this.databaseService.url.findUnique({
          where: {
            short_url: unique
          }
        })
      } while (foundInDB);
      const user: users = await this.usersService.findByUsername(username);
      if (!user) {
        throw new InternalServerErrorException('User not found')
      }
      createUrlDto.user_id = user.user_id;
      const shortnedURL: url = await this.databaseService.url.create({
        data: {
          short_url: unique,
          ...createUrlDto
        }

      })
      if (!shortnedURL) {
        throw new InternalServerErrorException('Failed to create short url');
      }
      return shortnedURL;

    } catch (error) {
      throw new InternalServerErrorException('Failed to create short url');
    }

  }
  //tb.sh/<uniquepattern>
  async generateUniquePattern() {
    const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = 62;
    let pattern = '';
    for (let i = 1; i <= 8; i++) {
      pattern += range.charAt(Math.floor(Math.random() * length));
    }
    return pattern;
  }
  async createPregenerated(username: string, qty: number): Promise<Prisma.urlCreateInput[] | undefined> {
    try {
      let urls: Prisma.urlCreateInput[] = [];
      for (let i = 0; i < qty; i++) {
        const shortnedURL: url = await this.create(username, { is_pre_generated: true });
        // console.log('--\n', shortnedURL, '--\n');
        if (shortnedURL) {
          urls.push(shortnedURL);
        }
      }
      // console.log('URLs to be inserted:', urls);

      // Perform bulk insert
      const createMany = await this.databaseService.url.createMany({
        data: urls,
        skipDuplicates: true, // Optionally skip duplicates
      });


      // console.log('Result of createMany:', createMany);
      if (!createMany) {
        throw new InternalServerErrorException('Failed to create pregenarted urls');
      }
      return urls;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create short url');
    }
  }
  async findAll(user_id: string): Promise<url[] | undefined> {
    try {

      const urls: url[] = await this.databaseService.url.findMany({ where: { user_id }, include: { urltag: true, logo: true } })
      if (!urls.length) {
        return undefined;
      }
      return urls;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get urls');

    }
  }
  async redirect(url: string) {
    return `this action redirects url ${url} if it is found in db`;
  }
  async findOne(id: string): Promise<url | undefined> {
    try {
      const url: url | undefined = await this.databaseService.url.findUnique({ where: { url_id: id }, include: { urltag: true, logo: true } });
      if (!url) {
        return undefined;
      }
      return url;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get url');
    }
  }

  async update(id: string, updateUrlDto: Prisma.urlUpdateInput): Promise<url | undefined> {
    try {
      const urlToUpdate: url | undefined = await this.databaseService.url.findUnique({ where: { url_id: id }, });
      if (!urlToUpdate) { throw new InternalServerErrorException('Url Not Found'); }
      const updatedUrl: url | undefined = await this.databaseService.url.update({ where: { url_id: id }, data: { ...updateUrlDto, updated_at: new Date(Date.now()) }, include: { urltag: true, logo: true } });
      if (updatedUrl) {
        const audit: auditlog = await this.auditlogsService.create({ url_id: id, action: `Update`, changed_by: urlToUpdate.user_id, change_date: new Date(Date.now()), details: `Updated ${urlToUpdate.short_url}` });

        return updatedUrl
      }
      return undefined;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update url data');
    }
  }

  async remove(id: string): Promise<url | undefined> {
    console.log("zeeshan", id);


    try {
      const urlToDelete: url | undefined = await this.databaseService.url.findUnique({ where: { url_id: id } });
      if (!urlToDelete) {
        throw new InternalServerErrorException('Url Not Found');

      }
      const deleted = await this.databaseService.url.delete({ where: { url_id: id } });
      if (!deleted)
        return undefined;

      // const audit: auditlog = await this.auditlogsService.create({ url_id: id, action: `Delete`, changed_by: urlToDelete.user_id, change_date: new Date(Date.now()), details: `Deleted ${urlToDelete.short_url}` });

      return deleted;

    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Failed to delete url');
    }
  }
}
