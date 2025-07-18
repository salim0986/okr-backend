import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { DepartmentModule } from './department/department.module';
import { TeamModule } from './team/team.module';
import { OkrModule } from './okr/okr.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Team } from './team/team.entity';
import { Organization } from './organization/organization.entity';
import { Department } from './department/department.entity';
import { Objective } from './okr/okr.entity';
import { KeyResult } from './keyresult/keyresult.entity';
import { KeyResultProgress } from './progress/progress.entity';
import { KeyresultModule } from './keyresult/keyresult.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Team,
        Organization,
        Department,
        Objective,
        KeyResult,
        KeyResultProgress,
      ],
      synchronize: process.env.ENVIRONMENT === 'development', // set false in production!
    }),
    UserModule,
    OrganizationModule,
    DepartmentModule,
    TeamModule,
    OkrModule,
    AuthModule,
    KeyresultModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
