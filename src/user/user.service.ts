// src/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './user.dto';
import { tryCatch } from 'src/utils/try-catch';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return tryCatch(async () => {
      return this.repo.find({
        relations: ['organization', 'team', 'progressUpdates'],
      });
    }, 'Error fetching users');
  }

  async findById(id: string): Promise<User> {
    return tryCatch(async () => {
      const user = await this.repo.findOne({
        where: { id },
        relations: ['organization', 'team', 'progressUpdates'],
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    }, 'Error fetching user');
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    return tryCatch(async () => {
      const user = await this.findById(id);
      Object.assign(user, dto);
      return this.repo.save(user);
    }, 'Error updating user');
  }

  async remove(id: string): Promise<string> {
    return tryCatch(async () => {
      const user = await this.findById(id);
      await this.repo.remove(user);
      return 'User deleted';
    }, 'Error deleting user');
  }

  async findByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }
}
