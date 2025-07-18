// src/key-result/key-result.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyResult } from './keyresult.entity';
import { CreateKeyResultDto, UpdateKeyResultDto } from './keyresult.dto';
import { tryCatch } from 'src/utils/try-catch';
import { Objective } from 'src/okr/okr.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class KeyResultService {
  constructor(
    @InjectRepository(KeyResult)
    private repo: Repository<KeyResult>,
    @InjectRepository(Objective)
    private readonly objectiveRepo: Repository<Objective>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateKeyResultDto): Promise<KeyResult> {
    return tryCatch(async () => {
      const objective = await this.objectiveRepo.findOne({
        where: { id: dto.objectiveId },
      });
      const createdBy = await this.userRepo.findOne({
        where: { id: dto.createdById },
      });
      const kr = this.repo.create({
        ...dto,
        objective,
        createdBy,
      });
      return await this.repo.save(kr);
    }, 'Error creating key result');
  }

  async findAll(): Promise<KeyResult[]> {
    return tryCatch(async () => {
      return this.repo.find({
        relations: ['objective'],
      });
    }, 'Error fetching key results');
  }

  async findByObjective(objectiveId: string): Promise<KeyResult[]> {
    return tryCatch(async () => {
      return this.repo.find({
        where: { objective: { id: objectiveId } },
        relations: ['objective'],
      });
    }, 'Error fetching key results for objective');
  }
  async findById(id: string): Promise<KeyResult> {
    return tryCatch(async () => {
      const kr = await this.repo.findOne({
        where: { id },
        relations: ['objective'],
      });
      if (!kr) throw new NotFoundException('Key Result not found');
      return kr;
    }, 'Error fetching key result');
  }

  async update(id: string, dto: UpdateKeyResultDto): Promise<KeyResult> {
    return tryCatch(async () => {
      const kr = await this.findById(id);
      Object.assign(kr, dto);
      return this.repo.save(kr);
    }, 'Error updating key result');
  }

  async remove(id: string): Promise<string> {
    return tryCatch(async () => {
      const kr = await this.findById(id);
      await this.repo.remove(kr);
      return 'Key Result deleted';
    }, 'Error deleting key result');
  }
}
