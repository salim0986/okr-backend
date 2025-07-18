// progress.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyResultProgress } from './progress.entity';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { KeyResult } from 'src/keyresult/keyresult.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeyResultProgress, KeyResult, User])],
  providers: [ProgressService],
  controllers: [ProgressController],
  exports: [ProgressService],
})
export class ProgressModule {}
