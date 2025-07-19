// src/team/team.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';
import { Public, Roles } from 'src/auth/auth-decorators';
import { Role } from 'src/user/user.entity';

@Controller('team')
export class TeamController {
  constructor(private readonly service: TeamService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  create(@Body() dto: CreateTeamDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  findAll() {
    return this.service.findAll();
  }
  @Get('organization/:organizationId')
  @Public()
  findByOrganization(@Param('organizationId') id: string) {
    return this.service.findByOrganization(id);
  }
  @Get('department/:departmentId')
  @Public()
  findByDepartment(@Param('department') id: string) {
    return this.service.findByDepartment(id);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER, Role.TEAM_LEAD)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
