import { Department } from 'src/department/department.entity';
import { KeyResult } from 'src/keyresult/keyresult.entity';
import { Organization } from 'src/organization/organization.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Objective {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  objective: string;
  @Column({ nullable: true })
  teamId: string;
  @Column({ nullable: true })
  departmentId: string;
  @Column({ nullable: true })
  createdById: string;

  @ManyToOne(() => Team, (team) => team.okrs, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  team: Team;
  @ManyToOne(() => Department, (department) => department.okrs, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  department: Department;
  @ManyToOne(() => Organization, (org) => org.okrs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  organization: Organization;
  @ManyToOne(() => User, (user) => user.okrs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  createdBy: User;

  @OneToMany(() => KeyResult, (kr) => kr.objective)
  keyResults: KeyResult[];
}
