import { Department } from 'src/department/department.entity';
import { KeyResult } from 'src/keyresult/keyresult.entity';
import { Objective } from 'src/okr/okr.entity';
import { Organization } from 'src/organization/organization.entity';
import { KeyResultProgress } from 'src/progress/progress.entity';
import { Team } from 'src/team/team.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  ORG_ADMIN = 'org_admin',
  DEPT_MANAGER = 'dept_manager',
  TEAM_LEAD = 'team_lead',
  EMPLOYEE = 'employee',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column({ nullable: true })
  organizationId: string;
  @Column({ nullable: true })
  organizationName: string;
  @Column({ nullable: true })
  departmentId: string;
  @Column({ nullable: true })
  departmentName: string;
  @Column({ nullable: true })
  teamId: string;
  @Column({ nullable: true })
  teamName: string;

  @Column({ type: 'enum', enum: Role, default: Role.EMPLOYEE })
  role: Role;

  @ManyToOne(() => Organization, (org) => org.users, {
    nullable: true,
    cascade: true,
  })
  organization: Organization;

  @ManyToOne(() => Department, (dep) => dep.users, {
    nullable: true,
    cascade: true,
  })
  department: Department;

  @ManyToOne(() => Team, (team) => team.users, {
    nullable: true,
    cascade: true,
  })
  team: Team;

  @OneToMany(() => Objective, (o) => o.createdBy, { nullable: true })
  okrs: Objective[];

  @OneToMany(() => KeyResult, (k) => k.createdBy, { nullable: true })
  keyResults: Objective[];

  @OneToMany(() => KeyResultProgress, (p) => p.user)
  progressUpdates: KeyResultProgress[];
}
