// src/progress/progress.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressUpdateDto } from './progress.dto';
import { Public } from 'src/auth/auth-decorators';

@Controller('progress')
export class ProgressController {
  constructor(private service: ProgressService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateProgressUpdateDto) {
    return this.service.create(dto);
  }

  @Get()
  @Public()
  findAll() {
    return this.service.findAll();
  }

  @Get('key-result/:id')
  @Public()
  findByKeyResult(@Param('id') id: string) {
    return this.service.findByKeyResult(id);
  }

  @Get('user/:id')
  @Public()
  findByUser(@Param('id') id: string) {
    return this.service.findByUser(id);
  }
}
