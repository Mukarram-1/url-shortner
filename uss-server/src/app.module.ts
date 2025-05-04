import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from 'common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UrlsModule } from './urls/urls.module';
import { UrlRedirectMiddleware } from 'common/middleware/url-redirect.middleware';
import { UrltagsModule } from './urltags/urltags.module';
import { UrlclicksModule } from './urlclicks/urlclicks.module';
import { MulterModule } from '@nestjs/platform-express';
import { LogosModule } from './logos/logos.module';
import { CloudinaryService } from 'common/cloudinary.service';
import { ApikeysModule } from './apikeys/apikeys.module';
import { AuditlogsModule } from './auditlogs/auditlogs.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, UrlsModule, UrltagsModule, UrlclicksModule,
    LogosModule,
    ApikeysModule,
    AuditlogsModule,
    MulterModule.register({
      dest: '../common/public/temp',
    }),


  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // logger middlware:
    consumer
      .apply(LoggerMiddleware) //middle ware before get request.
      .exclude({ path: 'urls/redirect/:url', method: RequestMethod.GET },)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    //url redirecting middleware /:url([a-zA-Z0-9]{8})
    consumer.
      apply(UrlRedirectMiddleware)
      .forRoutes({ path: 'urls/redirect/:url', method: RequestMethod.GET });

  }
}
