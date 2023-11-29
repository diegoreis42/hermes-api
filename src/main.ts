import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(process.env.SERVER_PORT);

    console.log(`Server listening on the port: ${process.env.SERVER_PORT}`);
}
bootstrap();
