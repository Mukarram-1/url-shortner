import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { AuditlogsService } from './auditlogs.service';
import { CreateAuditlogDto } from './dto/create-auditlog.dto';
import { UpdateAuditlogDto } from './dto/update-auditlog.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { auditlog } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('auditlogs')
export class AuditlogsController {
  constructor(private readonly auditlogsService: AuditlogsService) { }
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: Request, createAuditlogDto: CreateAuditlogDto): Promise<auditlog> {
    try {
      const user_id: string | undefined = req['user']['user_id'];
      if (!user_id) {
        throw new UnauthorizedException('Unauthorized')
      }
      return await this.auditlogsService.create(createAuditlogDto);
    } catch (error) {
      throw new UnauthorizedException('can not create audit log');
    }
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll(@Req() req: Request): Promise<auditlog[]> {
    try {
      const user_id: string | undefined = req['user']['user_id'];
      if (!user_id) {
        throw new UnauthorizedException('Unauthorized')
      }
      return await this.auditlogsService.findAll();
    } catch (error) {
      throw new UnauthorizedException('can not get audit logs');
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditlogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditlogDto: UpdateAuditlogDto) {
    return this.auditlogsService.update(+id, updateAuditlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditlogsService.remove(+id);
  }
}
