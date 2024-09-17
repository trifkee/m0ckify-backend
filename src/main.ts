import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://m0ckify.vercel.app/', // Specific origin
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
      credentials: true, // Enable cookies
    },
  });

  await app.listen(3001);
}

bootstrap();
