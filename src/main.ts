import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:8081',
    credentials: true,
  };

  app.enableCors(corsOptions);


  app.useGlobalPipes(new ValidationPipe({
    //for no extra datafield in like email,pass with unwanted id
    whitelist:true,
  }))
  await app.listen(3000);
}
bootstrap();
 