import { Module } from '@nestjs/common';
import { LogosService } from './logos.service';
import { LogosController } from './logos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryService } from 'common/cloudinary.service';
@Module({
  imports: [DatabaseModule, UsersModule,],
  controllers: [LogosController],
  providers: [LogosService, CloudinaryService],
})
export class LogosModule { }
