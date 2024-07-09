import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const port = parseInt(process.env.PORT)
  const host = process.env.SERVER_HOST

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  await app.listen(port)
  Logger.log(`Application is running on: http://${host}:${port}/`)
}
bootstrap();
