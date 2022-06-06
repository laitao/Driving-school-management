import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  username: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ length: 20 })
  password: string;

  @Column({ default: '' })
  avatar: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
