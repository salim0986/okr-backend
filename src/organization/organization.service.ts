// src/organization/organization.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './organization.dto';
import { tryCatch } from 'src/utils/try-catch';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  async create(dto: CreateOrganizationDto): Promise<Organization> {
    return tryCatch(async () => {
      const org = this.orgRepo.create(dto);
      return this.orgRepo.save(org);
    }, 'Error creating organization');
  }

  async findAll(): Promise<Organization[]> {
    return tryCatch(async () => {
      return this.orgRepo.find();
    }, 'Error fetching organizations');
  }
  async findMyOrganization(userId: string): Promise<Organization[]> {
    return tryCatch(async () => {
      return this.orgRepo.find({
        where: { users: { id: userId } },
        relations: ['users'],
      });
    }, 'Error fetching organization for user');
  }

  async findOne(id: string): Promise<Organization> {
    return tryCatch(async () => {
      const org = await this.orgRepo.findOne({ where: { id } });
      if (!org) {
        throw new NotFoundException(`Organization ${id} not found`);
      }
      return org;
    }, `Error fetching organization ${id}`);
  }

  async update(id: string, dto: UpdateOrganizationDto): Promise<Organization> {
    return tryCatch(async () => {
      const org = await this.findOne(id);
      Object.assign(org, dto);
      return this.orgRepo.save(org);
    }, `Error updating organization ${id}`);
  }

  async deleteById(id: string): Promise<void> {
    return tryCatch(async () => {
      const org = await this.findOne(id);
      await this.orgRepo.remove(org);
    }, `Error deleting organization ${id}`);
  }

  async findUsers(id: string) {
    return tryCatch(async () => {
      const org = await this.orgRepo.findOne({
        where: { id },
        relations: ['users'],
      });
      if (!org) {
        throw new NotFoundException(`Organization ${id} not found`);
      }
      return org.users;
    }, `Error fetching users for organization ${id}`);
  }
}
