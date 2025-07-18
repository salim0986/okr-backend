// src/progress/progress.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyResultProgress } from './progress.entity';
import { tryCatch } from 'src/utils/try-catch';
import { CreateProgressUpdateDto } from './progress.dto';
import { KeyResult } from 'src/keyresult/keyresult.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(KeyResultProgress)
    private repo: Repository<KeyResultProgress>,
    @InjectRepository(KeyResult)
    private keyResultRepo: Repository<KeyResult>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateProgressUpdateDto): Promise<KeyResultProgress> {
    return tryCatch(async () => {
      const keyResult = await this.keyResultRepo.findOne({
        where: { id: dto.keyResultId },
      });
      const user = await this.userRepo.findOne({
        where: { id: dto.userId },
      });
      const progress = this.repo.create({
        progress: dto.progress,
        note: dto.note,
        keyResult,
        keyResultId: dto.keyResultId,
        user,
      });
      return await this.repo.save(progress);
    }, 'Error creating progress update');
  }

  async findAll(): Promise<KeyResultProgress[]> {
    return tryCatch(async () => {
      return this.repo.find({
        relations: ['user', 'keyResult'],
        order: { createdAt: 'DESC' },
      });
    }, 'Error fetching progress updates');
  }

  async findByKeyResult(keyResultId: string): Promise<KeyResultProgress[]> {
    return tryCatch(async () => {
      return this.repo.find({
        where: { keyResult: { id: keyResultId } },
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
    }, 'Error fetching updates for key result');
  }

  async findByUser(userId: string): Promise<KeyResultProgress[]> {
    return tryCatch(async () => {
      return this.repo.find({
        where: { user: { id: userId } },
        relations: ['keyResult'],
        order: { createdAt: 'DESC' },
      });
    }, 'Error fetching updates by user');
  }
}
