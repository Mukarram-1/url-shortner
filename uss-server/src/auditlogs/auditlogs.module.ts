import { Module } from '@nestjs/common';
import { AuditlogsService } from './auditlogs.service';
import { AuditlogsController } from './auditlogs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuditlogsController],
  providers: [AuditlogsService],
  exports: [AuditlogsService]
})
export class AuditlogsModule { }
