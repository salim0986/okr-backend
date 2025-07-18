// src/key-result/key-result.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { KeyResultService } from './keyresult.service';
import { CreateKeyResultDto, UpdateKeyResultDto } from './keyresult.dto';
import { Public, Roles } from 'src/auth/auth-decorators';
import { Role } from 'src/user/user.entity';

@Controller('key-result')
export class KeyResultController {
  constructor(private service: KeyResultService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  create(@Body() dto: CreateKeyResultDto) {
    return this.service.create(dto);
  }

  @Get()
  @Public()
  findAll() {
    return this.service.findAll();
  }
  @Get('objective/:id')
  @Public()
  findByObjective(@Param('id') id: string) {
    return this.service.findByObjective(id);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  update(@Param('id') id: string, @Body() dto: UpdateKeyResultDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ORG_ADMIN, Role.DEPT_MANAGER)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
