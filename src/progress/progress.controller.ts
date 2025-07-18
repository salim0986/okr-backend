// src/progress/progress.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressUpdateDto } from './progress.dto';
import { Roles } from 'src/auth/auth-decorators';
import { Role } from 'src/user/user.entity';

@Controller('progress')
export class ProgressController {
  constructor(private service: ProgressService) {}

  @Post()
  @Roles(
    Role.ADMIN,
    Role.ORG_ADMIN,
    Role.DEPT_MANAGER,
    Role.TEAM_LEAD,
    Role.EMPLOYEE,
  )
  create(@Body() dto: CreateProgressUpdateDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(
    Role.ADMIN,
    Role.ORG_ADMIN,
    Role.DEPT_MANAGER,
    Role.TEAM_LEAD,
    Role.EMPLOYEE,
  )
  findAll() {
    return this.service.findAll();
  }

  @Get('key-result/:id')
  @Roles(
    Role.ADMIN,
    Role.ORG_ADMIN,
    Role.DEPT_MANAGER,
    Role.TEAM_LEAD,
    Role.EMPLOYEE,
  )
  findByKeyResult(@Param('id') id: string) {
    return this.service.findByKeyResult(id);
  }

  @Get('user/:id')
  @Roles(
    Role.ADMIN,
    Role.ORG_ADMIN,
    Role.DEPT_MANAGER,
    Role.TEAM_LEAD,
    Role.EMPLOYEE,
  )
  findByUser(@Param('id') id: string) {
    return this.service.findByUser(id);
  }
}
