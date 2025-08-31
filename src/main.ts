import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { seed } from './products/products.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const dataSource = app.get(DataSource) // TypeORM dataSource está registrado por el módulo
  await seed(dataSource)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const config = new DocumentBuilder()
    .setTitle('Za-🦆🦆🦆 Search API')
    .setDescription('Búsqueda con 50% off si q es palíndromo')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT || 3005)
}
bootstrap()