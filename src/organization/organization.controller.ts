// src/organization/organization.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Req,
  Delete,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
// src/organization/organization.service.ts
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './organization.dto';

import { Public, Roles } from '../auth/auth-decorators';
import { Role } from '../user/user.entity';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateOrganizationDto) {
    return this.orgService.create(dto);
  }
  @Get('me')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  findMyOrganization(@Req() req) {
    return this.orgService.findMyOrganization(req.user.id);
  }

  @Get()
  @Public()
  findAll() {
    return this.orgService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  findOne(@Param('id') id: string) {
    return this.orgService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteById(@Param('id') id: string) {
    return this.orgService.deleteById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.orgService.update(id, dto);
  }

  @Get(':id/users')
  @Roles(Role.ADMIN, Role.ORG_ADMIN)
  findUsers(@Param('id') id: string) {
    return this.orgService.findUsers(id);
  }
}
