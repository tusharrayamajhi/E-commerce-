/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('ecommerce example')
  .setDescription('The E-commerce API description')
  .setVersion('1.0')
  .addBasicAuth({type:'http',scheme:'bearer',bearerFormat:"jwt"},"jwt")
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log(`http://localhost:3000`)
}
bootstrap();
