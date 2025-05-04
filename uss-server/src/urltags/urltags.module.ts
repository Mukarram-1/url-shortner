import { Module } from '@nestjs/common';
import { UrltagsService } from './urltags.service';
import { UrltagsController } from './urltags.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [UrltagsController],
  providers: [UrltagsService],
})
export class UrltagsModule { }
