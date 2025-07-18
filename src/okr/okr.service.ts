// src/okr/okr.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Objective } from './okr.entity';
import { CreateObjectiveDto, UpdateObjectiveDto } from './okr.dto';
import { tryCatch } from 'src/utils/try-catch';
import { Team } from 'src/team/team.entity';
import { Department } from 'src/department/department.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class OkrService {
  constructor(
    @InjectRepository(Objective)
    private repo: Repository<Objective>,
    @InjectRepository(Team)
    private teamRepo: Repository<Team>,
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createObjective(dto: CreateObjectiveDto): Promise<Objective> {
    return tryCatch(async () => {
      const team = await this.teamRepo.findOne({
        where: { id: dto.teamId },
      });
      const department = await this.departmentRepo.findOne({
        where: { id: dto.departmentId },
      });
      const createdBy = await this.userRepo.findOne({
        where: { id: dto.createdById },
      });
      const obj = this.repo.create({
        ...dto,
        team,
        department,
        createdBy,
        teamId: dto.teamId,
        departmentId: dto.departmentId,
        createdById: dto.createdById,
      });

      return await this.repo.save(obj);
    }, 'Error creating objective');
  }

  async findAll(): Promise<Objective[]> {
    return tryCatch(async () => {
      return this.repo.find({
        relations: ['team', 'keyResults'],
      });
    }, 'Error fetching objectives');
  }
  async findByOrganization(organizationId: string): Promise<Objective[]> {
    return tryCatch(async () => {
      return this.repo.find({
        where: { team: { organization: { id: organizationId } } },
        relations: ['team', 'keyResults'],
      });
    }, 'Error fetching objectives for organization');
  }
  async findByDepartment(departmentId: string): Promise<Objective[]> {
    return tryCatch(async () => {
      return this.repo.find({
        where: { department: { id: departmentId } },
        relations: ['team', 'keyResults'],
      });
    }, 'Error fetching objectives for department');
  }
  async findByTeam(teamId: string): Promise<Objective[]> {
    return tryCatch(async () => {
      return this.repo.find({
        where: { team: { id: teamId } },
        relations: ['team', 'keyResults'],
      });
    }, 'Error fetching objectives for team');
  }

  async findById(id: string): Promise<Objective> {
    return tryCatch(async () => {
      const obj = await this.repo.findOne({
        where: { id },
        relations: ['team', 'keyResults'],
      });
      if (!obj) throw new NotFoundException('Objective not found');
      return obj;
    }, 'Error fetching objective');
  }

  async update(id: string, dto: UpdateObjectiveDto): Promise<Objective> {
    return tryCatch(async () => {
      const obj = await this.findById(id);
      Object.assign(obj, dto);
      return await this.repo.save(obj);
    }, 'Error updating objective');
  }

  async remove(id: string): Promise<string> {
    return tryCatch(async () => {
      const obj = await this.findById(id);
      await this.repo.remove(obj);
      return 'Objective deleted';
    }, 'Error deleting objective');
  }
}
