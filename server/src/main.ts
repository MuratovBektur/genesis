import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const isDev = process.env.NODE_ENV === 'dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('Genesis')
      .setVersion('1.0')
      .setBasePath(globalPrefix)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/explorer`, app, document);
  }

  await app.listen(5000);
}
bootstrap();
