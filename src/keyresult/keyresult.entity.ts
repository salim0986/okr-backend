import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Objective } from 'src/okr/okr.entity';
import { KeyResultProgress } from 'src/progress/progress.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class KeyResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  @Column({ nullable: true })
  description: string;

  @Column()
  targetValue: number;

  @Column()
  currentValue: number;

  @Column({ nullable: true })
  objectiveId: string;
  @Column({ nullable: true })
  createdById: string;

  @ManyToOne(() => Objective, (objective) => objective.keyResults, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  objective: Objective;
  @ManyToOne(() => User, (u) => u.keyResults, { nullable: true, cascade: true })
  createdBy: User;

  @OneToMany(() => KeyResultProgress, (progress) => progress.keyResult)
  progressUpdates: KeyResultProgress[];
}
