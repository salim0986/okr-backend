// key-result.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyResult } from './keyresult.entity';
import { KeyResultService } from './keyresult.service';
import { KeyResultController } from './keyresult.controller';
import { Objective } from 'src/okr/okr.entity';
import { User } from 'src/user/user.entity';
import { Department } from 'src/department/department.entity';
import { Team } from 'src/team/team.entity';
import { Organization } from 'src/organization/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KeyResult,
      Objective,
      User,
      Department,
      Team,
      Organization,
    ]),
  ],
  providers: [KeyResultService],
  controllers: [KeyResultController],
  exports: [KeyResultService],
})
export class KeyresultModule {}
