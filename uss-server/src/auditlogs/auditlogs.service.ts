import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuditlogDto } from './dto/create-auditlog.dto';
import { UpdateAuditlogDto } from './dto/update-auditlog.dto';
import { DatabaseService } from 'src/database/database.service';
import { auditlog } from '@prisma/client';

@Injectable()
export class AuditlogsService {
  constructor(private readonly databaseService: DatabaseService) { }
  async create(createAuditlogDto: CreateAuditlogDto): Promise<auditlog | undefined> {
    try {
      const audit: auditlog = await this.databaseService.auditlog.create({
        data: {
          ...createAuditlogDto

        }
      });
      if (!audit) {
        throw new UnauthorizedException('Auditlog not created')
      }
      return audit;
    } catch (error) {
      throw new UnauthorizedException('can not create new audit info');
    }
  }

  async findAll(): Promise<auditlog[]> {
    try {
      const audits: auditlog[] = await this.databaseService.auditlog.findMany({ include: { users: true, url: true } })
      if (!audits || !(audits.length)) {
        return [];
      }
      return audits;
    } catch (error) {
      throw new UnauthorizedException('can not get audit logs info');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auditlog`;
  }

  update(id: number, updateAuditlogDto: UpdateAuditlogDto) {
    return `This action updates a #${id} auditlog`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditlog`;
  }
}
