// src/department/department.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.dto';
import { Organization } from 'src/organization/organization.entity';
import { tryCatch } from 'src/utils/try-catch';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly deptRepo: Repository<Department>,
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  async create(dto: CreateDepartmentDto): Promise<Department> {
    return tryCatch(async () => {
      const org = await this.orgRepo.findOne({
        where: { id: dto.organizationId },
      });
      if (!org) throw new NotFoundException('Organization not found');

      const dept = this.deptRepo.create({ name: dto.name, organization: org });
      return this.deptRepo.save(dept);
    }, 'Error creating department');
  }

  async findAll(): Promise<Department[]> {
    return tryCatch(async () => {
      const departments = this.deptRepo.find({
        relations: ['organization', 'teams'],
      });
      if (!departments) throw new NotFoundException('No departments found');
      return departments;
    }, 'Error fetching departments');
  }

  async findByOrganization(orgId: string): Promise<Department[]> {
    return tryCatch(async () => {
      const departments = await this.deptRepo.find({
        where: { organization: { id: orgId } },
        relations: ['organization', 'teams'],
      });
      if (!departments.length)
        throw new NotFoundException(
          'No departments found for this organization',
        );
      return departments;
    }, 'Error fetching departments by organization');
  }
  async findOne(id: string): Promise<Department> {
    return tryCatch(async () => {
      const dept = await this.deptRepo.findOne({
        where: { id },
        relations: ['organization', 'teams'],
      });
      if (!dept) throw new NotFoundException('Department not found');
      return dept;
    }, 'Error fetching department');
  }

  async update(id: string, dto: UpdateDepartmentDto): Promise<Department> {
    return tryCatch(async () => {
      const dept = await this.findOne(id);
      Object.assign(dept, dto);
      return await this.deptRepo.save(dept);
    }, 'Error updating department');
  }

  async remove(id: string): Promise<string> {
    return tryCatch(async () => {
      const dept = await this.findOne(id);
      await this.deptRepo.remove(dept);
      return 'Department deleted';
    }, 'Error deleting department');
  }
}
