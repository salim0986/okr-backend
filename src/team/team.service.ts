// src/team/team.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';
import { Department } from 'src/department/department.entity';
import { tryCatch } from 'src/utils/try-catch';
import { Organization } from 'src/organization/organization.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly repo: Repository<Team>,
    @InjectRepository(Department)
    private readonly deptRepo: Repository<Department>,
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  async create(dto: CreateTeamDto): Promise<Team> {
    return tryCatch(async () => {
      const department = await this.deptRepo.findOne({
        where: { id: dto.departmentId },
      });
      const organization = await this.orgRepo.findOne({
        where: { id: dto.organizationId },
      });
      const team = this.repo.create({
        name: dto.name,
        department,
        organization,
        departmentId: dto.departmentId,
        organizationId: dto.organizationId,
      });
      return this.repo.save(team);
    }, 'Error creating team');
  }

  async findAll(): Promise<Team[]> {
    return tryCatch(async () => {
      return this.repo.find({ relations: ['department', 'users', 'okrs'] });
    }, 'Error fetching teams');
  }
  async findByOrganization(organizationId: string): Promise<Team[]> {
    return tryCatch(async () => {
      return this.repo.find({
        where: { organization: { id: organizationId } },
        relations: ['users', 'okrs'],
      });
    }, 'Error fetching teams for organization');
  }
  async findByDepartment(departmentId: string): Promise<Team[]> {
    return tryCatch(async () => {
      return this.repo.find({
        where: { department: { id: departmentId } },
        relations: ['users', 'okrs'],
      });
    }, 'Error fetching teams for department');
  }

  async findOne(id: string): Promise<Team> {
    return tryCatch(async () => {
      const team = await this.repo.findOne({
        where: { id },
        relations: ['department', 'users', 'okrs'],
      });
      if (!team) throw new NotFoundException('Team not found');
      return team;
    }, 'Error fetching team');
  }

  async update(id: string, dto: UpdateTeamDto): Promise<Team> {
    return tryCatch(async () => {
      const team = await this.findOne(id);
      Object.assign(team, dto);
      return await this.repo.save(team);
    }, 'Error updating team');
  }

  async remove(id: string): Promise<string> {
    return tryCatch(async () => {
      const team = await this.findOne(id);
      await this.repo.remove(team);
      return 'Team deleted';
    }, 'Error deleting team');
  }
}
