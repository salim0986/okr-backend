import { Department } from 'src/department/department.entity';
import { Objective } from 'src/okr/okr.entity';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Department, (dept) => dept.organization, { eager: true })
  departments: Department[];

  @OneToMany(() => Team, (team) => team.organization, { eager: true })
  teams: Team[];

  @OneToMany(() => User, (user) => user.organization)
  users: User[];
  @OneToMany(() => Objective, (user) => user.organization)
  okrs: Objective[];
}
