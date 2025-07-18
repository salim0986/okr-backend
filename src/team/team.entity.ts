import { Department } from 'src/department/department.entity';
import { Objective } from 'src/okr/okr.entity';
import { Organization } from 'src/organization/organization.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column({ nullable: true })
  organizationId: string;
  @Column({ nullable: true })
  departmentId: string;

  @ManyToOne(() => Organization, (org) => org.teams, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @ManyToOne(() => Department, (dept) => dept.teams, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  department: Department;

  @OneToMany(() => User, (user) => user.team)
  users: User[];

  @OneToMany(() => Objective, (okr) => okr.team)
  okrs: Objective[];
}
