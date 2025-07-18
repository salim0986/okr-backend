import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { Role } from './user/user.entity';
import { AuthService } from './auth/auth.service';

async function seedAdmin(app) {
  const authService = app.get(AuthService);
  const userService = app.get(UserService);
  const existing = await userService.findByEmail('admin@myokr.com');
  if (!existing) {
    await authService.register({
      name: 'Platform Admin',
      email: 'admin@myokr.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: Role.ADMIN,
    });
    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // Enable CORS for all routes
  app.enableCors({
    origin: '*', // Allow all origins, adjust as needed for security
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow credentials if needed
  });
  await seedAdmin(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
