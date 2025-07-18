// src/user/user.controller.ts

import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';
import { Roles } from 'src/auth/auth-decorators';
import { Role } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  findAll() {
    return this.service.findAll();
  }

  @Get('me')
  @Roles(
    Role.ADMIN,
    Role.ORG_ADMIN,
    Role.DEPT_MANAGER,
    Role.TEAM_LEAD,
    Role.EMPLOYEE,
  )
  me(@Req() req) {
    return this.service.findById(req.user.id);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
