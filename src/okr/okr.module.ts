// okr.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Objective } from './okr.entity';
import { OkrService } from './okr.service';
import { OkrController } from './okr.controller';
import { Team } from 'src/team/team.entity';
import { KeyResult } from 'src/keyresult/keyresult.entity';
import { Department } from 'src/department/department.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Objective, Department, User, Team, KeyResult]),
  ],
  providers: [OkrService],
  controllers: [OkrController],
  exports: [OkrService],
})
export class OkrModule {}
