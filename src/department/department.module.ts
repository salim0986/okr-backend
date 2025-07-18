// department.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { Organization } from 'src/organization/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Organization])],
  providers: [DepartmentService],
  controllers: [DepartmentController],
  exports: [DepartmentService], // Export if needed by other modules
})
export class DepartmentModule {}
