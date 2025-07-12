import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for React Native/Expo
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  });

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // Global prefix for all routes
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces
  console.log(`🚀 NestJS API Server running on http://0.0.0.0:${port}/api`);
  console.log(`📱 For mobile devices use: http://192.168.100.149:${port}/api`);
}
bootstrap();
