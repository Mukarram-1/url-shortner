import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // NEW //
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips properties that do not have decorators
    forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are provided
    transform: true, // Transforms plain objects to class instances
  }));
  await app.listen(3000);
}
bootstrap();
