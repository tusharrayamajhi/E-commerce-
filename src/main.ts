/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:['http://example.com', 'http://another.com']
  })



  const config = new DocumentBuilder()
  .setTitle('ecommerce example')
  .setDescription('The E-commerce API description')
  .setVersion('1.0')
  .addBasicAuth({type:'http',scheme:'bearer',bearerFormat:"jwt"},"jwt")
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  SwaggerModule.setup('api', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });
  // origin: [
  //   "https://chatfrontend-one.vercel.app",
  //   "https://chatfrontend-tusharrayamajhis-projects.vercel.app",
  //   "https://chatfrontend-git-main-tusharrayamajhis-projects.vercel.app",
  //   "https://chatfrontend-nxq7rkg9j-tusharrayamajhis-projects.vercel.app"
  // ]
  app.enableCors({
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  await app.listen(3000);
  console.log(`http://localhost:3000`)
}
bootstrap();
