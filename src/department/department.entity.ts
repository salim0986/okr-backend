import { Objective } from 'src/okr/okr.entity';
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
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  organizationId: string;

  @ManyToOne(() => Organization, (org) => org.departments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @OneToMany(() => Team, (team) => team.department)
  teams: Team[];

  @OneToMany(() => User, (user) => user.department)
  users: User[];
  @OneToMany(() => Objective, (objective) => objective.department)
  okrs: Objective[];
}
