// src/department/department.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.dto';
import { Public, Roles } from 'src/auth/auth-decorators';
import { Role } from 'src/user/user.entity';

@Controller('department')
export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  create(@Body() dto: CreateDepartmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  findAll() {
    return this.service.findAll();
  }

  @Get('organization/:orgId')
  @Public()
  findByOrganization(@Param('orgId') orgId: string) {
    return this.service.findByOrganization(orgId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
