import { Body, Controller, Delete, Get, Param, Post, UseGuards, Query, UseFilters, ForbiddenException, Patch, Req } from '@nestjs/common';
import { UrltagsService } from './urltags.service';
import { Prisma, urltag } from '@prisma/client';
import { CreateUrltagDto } from './dto/create-urltag.dto';
import { UpdateUrltagDto } from './dto/update-urltag.dto';
import { Roles } from 'src/decorators/roles.decorator'; //ROLES CUSTOM DECORATOR
import { Role } from 'src/enums/role.enum';//ROLES ENUM -> 1,2
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AllExceptionsFilter } from 'src/exceptions/all-exception.filter';
import { Request } from 'express';
import { ApiKeyAuthGuard } from 'common/middleware/api-key-auth.guard';
@UseFilters(AllExceptionsFilter)
@UseGuards(AuthGuard)
@Controller('urltags')

export class UrltagsController {
  constructor(private readonly urltagsService: UrltagsService) { }
  // @UseGuards(ApiKeyAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() createUrltagDto: CreateUrltagDto): Promise<urltag | undefined> {
    const user_id = req['user']['user_id'];
    try {
      if (!user_id) {
        throw new ForbiddenException('You are not logged in');
      }
      return await this.urltagsService.create(user_id, createUrltagDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(@Req() req: Request,): Promise<urltag[] | undefined> {
    const user_id = req['user']['user_id'];
    try {
      if (!user_id) {
        throw new ForbiddenException('You are not logged in');
      }
      return await this.urltagsService.findAll(user_id);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urltagsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUrltagDto: UpdateUrltagDto): Promise<urltag | undefined> {
    try {
      console.log("tag name: ", updateUrltagDto);
      return await this.urltagsService.update(+id, updateUrltagDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string): Promise<urltag | undefined> {
    const user_id = req['user']['user_id'];
    try {
      if (!user_id) {
        throw new ForbiddenException('You are not logged in');
      }
      return await this.urltagsService.remove(+id);
    } catch (error) {
      throw error;
    }

  }
}
