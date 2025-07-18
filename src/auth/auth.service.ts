import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { AuthResponseDto, CreateUserDto } from '../user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { tryCatch } from 'src/utils/try-catch';
import { Organization } from 'src/organization/organization.entity';
import { Department } from 'src/department/department.entity';
import { Team } from 'src/team/team.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<AuthResponseDto> {
    return tryCatch(async () => {
      if (
        !dto.name ||
        !dto.role ||
        !dto.email ||
        !dto.password ||
        (dto.role != Role.ADMIN && !dto.organizationId)
      ) {
        throw new NotAcceptableException(
          'Name, email, role, and password are required',
        );
      }
      const existing = await this.repo.findOne({ where: { email: dto.email } });
      const saltOrRounds = 10;

      if (existing) {
        throw new NotAcceptableException('User already exists with this email');
      }
      console.log(dto.role);
      let organization: Organization;
      if (
        [
          Role.ORG_ADMIN,
          Role.DEPT_MANAGER,
          Role.TEAM_LEAD,
          Role.EMPLOYEE,
        ].includes(dto.role) &&
        dto.organizationId
      ) {
        organization = await this.organizationRepo.findOne({
          where: { id: dto.organizationId },
        });
        if (!organization) {
          throw new NotFoundException('Organization not found');
        }
      }
      let department: Department;
      if (
        [Role.DEPT_MANAGER, Role.TEAM_LEAD, Role.EMPLOYEE].includes(dto.role) &&
        dto.departmentId
      ) {
        department = await this.departmentRepo.findOne({
          where: { id: dto.departmentId, organization: organization },
        });
        if (!department) {
          throw new NotFoundException('Department not found');
        }
      }
      let team: Team;
      if ([Role.EMPLOYEE, Role.TEAM_LEAD].includes(dto.role) && dto.teamId) {
        team = await this.teamRepo.findOne({
          where: { id: dto.teamId },
        });
        if (!team) {
          throw new NotFoundException('Team not found');
        }
      }

      const hash = await bcrypt.hash(dto.password, saltOrRounds);
      let user = this.repo.create({
        ...dto,
        organization,
        department,
        team,
        organizationId: organization?.id,
        organizationName: organization?.name,
        departmentId: department?.id,
        departmentName: department?.name,
        teamId: team?.id,
        teamName: team?.name,
        password: hash,
      });
      user = await this.repo.save(user);
      const payload = {
        sub: user.email,
        username: user.name,
        id: user.id,
        role: user.role,
        departmentId: user.departmentId,
        teamId: user.teamId,
        organizationId: user.organizationId,
        departmentName: department?.name,
        teamName: team?.name,
        organizationName: organization?.name,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }, 'Error registering user');
  }

  async login(email: string, password: string): Promise<AuthResponseDto> {
    return tryCatch(async () => {
      if (!email || !password) {
        throw new NotAcceptableException('Email and password are required');
      }
      const user = await this.repo.findOneBy({ email });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!user || !isMatch) {
        throw new NotFoundException('Invalid email or password');
      }
      const payload = {
        sub: user.email,
        username: user.name,
        id: user.id,
        role: user.role,
        departmentId: user.departmentId,
        teamId: user.teamId,
        organizationId: user.organizationId,
        departmentName: user.departmentName,
        teamName: user.teamName,
        organizationName: user.organizationName,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }, 'Error logging in user');
  }
}
