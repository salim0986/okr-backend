import { KeyResult } from 'src/keyresult/keyresult.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class KeyResultProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  keyResultId: string;

  @ManyToOne(() => KeyResult, (kr) => kr.progressUpdates, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  keyResult: KeyResult;

  @ManyToOne(() => User, (user) => user.progressUpdates, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column('float')
  progress: number;

  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
