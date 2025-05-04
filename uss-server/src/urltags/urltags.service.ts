import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUrltagDto } from './dto/create-urltag.dto';
import { Prisma, users, urltag } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { UpdateUrltagDto } from './dto/update-urltag.dto';

@Injectable()
export class UrltagsService {
  constructor(private readonly databaseService: DatabaseService, private usersService: UsersService) { }
  async create(user_id: string, createUrltagDto: CreateUrltagDto): Promise<urltag | undefined> {
    try {
      const exists: boolean = await this.checkIfExists(createUrltagDto.tag_name, user_id);
      if (exists) {
        throw new InternalServerErrorException('Tag already exists')
      }
      const urlTag: urltag = await this.databaseService.urltag.create({ data: { user_id: user_id, tag_name: createUrltagDto.tag_name } });
      if (!urlTag) {
        throw new InternalServerErrorException('Failed to create url tag');
      }
      return urlTag;

    } catch (error) {
      throw new InternalServerErrorException('Failed to create url tag');
    }
  }

  async findAll(user_id: string): Promise<urltag[] | undefined> {
    try {
      const urlTag: urltag[] = await this.databaseService.urltag.findMany({ where: { user_id: user_id } })
      if (!urlTag.length) {
        return undefined;
      }
      return urlTag;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get url tags');

    }
  }


  findOne(id: number) {
    return `This action returns a #${id} urltag`;
  }

  async update(id: number, updateUrltagDto: UpdateUrltagDto): Promise<urltag | undefined> {
    try {
      const updated: urltag = await this.databaseService.urltag.update({
        where: {
          tag_id: id
        }, data:
          updateUrltagDto
      })
      if (!updated) {
        return undefined;
      }
      console.log("updated:", updated);
      return updated;
    } catch (error) {

    }
  }

  async remove(id: number): Promise<urltag | undefined> {
    try {
      const deleted: urltag = await this.databaseService.urltag.delete({ where: { tag_id: id } })
      if (!deleted) {
        return undefined;
      }
      return deleted;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete url tag');
    }
  }
  async checkIfExists(tag_name: string, user_id: string): Promise<boolean> {
    const urlTag: urltag | undefined = await this.databaseService.urltag.findFirst({ where: { tag_name, user_id } })
    if (urlTag)
      return true;

    return false;

  }
}
