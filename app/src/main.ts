import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as dotenv from 'dotenv';
import { env } from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { DataGenerator } from './generate-Data';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('online educational platform example')
    .setDescription('online educational platform description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new SupertokensExceptionFilter());

  app.enableCors({
    origin: ['http://localhost:3333'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  await app.listen(env.PORT);

  const generator = new DataGenerator();
  generator.generateData();

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
