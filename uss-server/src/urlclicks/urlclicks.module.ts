import { Module } from '@nestjs/common';
import { UrlclicksService } from './urlclicks.service';
import { UrlclicksController } from './urlclicks.controller';
import { DatabaseModule } from 'src/database/database.module';

import { UrlsModule } from 'src/urls/urls.module';
@Module({
  imports: [DatabaseModule, UrlsModule],
  controllers: [UrlclicksController],
  providers: [UrlclicksService],
  exports: [UrlclicksService]
})
export class UrlclicksModule { }
