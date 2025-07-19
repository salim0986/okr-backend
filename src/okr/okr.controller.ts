// src/okr/okr.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OkrService } from './okr.service';
import { CreateObjectiveDto, UpdateObjectiveDto } from './okr.dto';
import { Public, Roles } from 'src/auth/auth-decorators';
import { Role } from 'src/user/user.entity';

@Controller('okr')
export class OkrController {
  constructor(private service: OkrService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  create(@Body() dto: CreateObjectiveDto) {
    return this.service.createObjective(dto);
  }

  @Get()
  @Public()
  findAll() {
    return this.service.findAll();
  }
  @Get('organization/:organizationId')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  findByOrganization(@Param('organizationId') id: string) {
    return this.service.findByOrganization(id);
  }
  @Get('department/:id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  findByDepartment(@Param('id') id: string) {
    return this.service.findByDepartment(id);
  }
  @Get('team/:id')
  @Public()
  findByTeam(@Param('id') id: string) {
    return this.service.findByTeam(id);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  update(@Param('id') id: string, @Body() dto: UpdateObjectiveDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
