import { Injectable, InternalServerErrorException, Query } from '@nestjs/common';
import { CreateUrlClickDto } from './dto/create-urlclick.dto';
import { UpdateUrlClickDto } from './dto/update-urlclick.dto';
import { Prisma, url, urlclick, users } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UrlsService } from 'src/urls/urls.service';

@Injectable()
export class UrlclicksService {
  constructor(private readonly databaseService: DatabaseService, private urlsService: UrlsService) { }

  async create(createUrlclickDto: CreateUrlClickDto): Promise<urlclick | undefined> {
    const { access_date: ad, ...rest } = createUrlclickDto;
    const access_date = new Date(ad).toISOString();
    try {
      const urlClick: urlclick = await this.databaseService.urlclick.create({
        data: {
          access_date, ...rest
        }
      });

      if (!urlClick) {
        return undefined;
      }
      return urlClick;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create url click');
    }
  }

  async findAll(url_id: string) {
    try {
      const urlClicks = await this.databaseService.urlclick.findMany({ where: { url_id }, include: { url: true } });
      if (!urlClicks) {
        return undefined;
      }
      return { urlclicks: [...urlClicks], count: urlClicks.length };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get url clicks of url: ${url_id}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} urlclick`;
  }

  update(id: number, updateUrlclickDto: UpdateUrlClickDto) {
    return `This action updates a #${id} urlclick`;
  }

  remove(id: number) {
    return `This action removes a #${id} urlclick`;
  }
}
