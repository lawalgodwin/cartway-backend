import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { FallbackExceptionFilter, HttpExceptionFilter } from "./filters";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new FallbackExceptionFilter(), new HttpExceptionFilter())
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(3000);
}


bootstrap();