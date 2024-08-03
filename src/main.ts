import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FallbackExceptionFilter,
  HttpExceptionFilter,
  ValidationException,
  ValidationFilter,
} from './common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error) =>
            `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`,
        );
        return new ValidationException(messages);
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cartway')
    .setDescription('Cartway Backend API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
