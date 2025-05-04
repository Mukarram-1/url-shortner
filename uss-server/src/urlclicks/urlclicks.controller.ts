import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards, Query, UseFilters, ForbiddenException, Patch } from '@nestjs/common';
import { UrlclicksService } from './urlclicks.service';
import { Prisma, url, users, urltag, urlclick } from '@prisma/client';
import { UpdateUrlClickDto } from './dto/update-urlclick.dto';
import { CreateUrlClickDto } from './dto/create-urlclick.dto';
import { Roles } from 'src/decorators/roles.decorator'; //ROLES CUSTOM DECORATOR
import { Role } from 'src/enums/role.enum';//ROLES ENUM -> 1,2
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('urlclicks')
export class UrlclicksController {
  constructor(private readonly urlclicksService: UrlclicksService) { }

  // @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUrlclickDto: CreateUrlClickDto): Promise<urlclick | undefined> {
    try {
      return await this.urlclicksService.create(createUrlclickDto);
    } catch (error) {
      console.log(error);
    }
  }

  //get urlclicks all and their count by giving id of url
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('url_id') url_id: string) {
    return this.urlclicksService.findAll(url_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlclicksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlclickDto: UpdateUrlClickDto) {
    return this.urlclicksService.update(+id, updateUrlclickDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlclicksService.remove(+id);
  }
}
