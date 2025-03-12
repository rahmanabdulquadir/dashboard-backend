import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Apply global validation pipe for DTOs
    app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('Admin Dashboard')
  .setDescription('Admin Dashboard Api')
  .setVersion('1.0')
  .addTag('users, admins, authentication')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory)

  // Enable body parsing
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();