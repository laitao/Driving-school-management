import { Exclude } from 'class-transformer';
import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  username: string;

  @Column({ length: 11 })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column('simple-enum', { enum: ['admin', 'normal', 'visitor'] })
  role: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  // @BeforeInsert()
  // async encyptPassword() {
  //   this.password = await this.bcrypt.hashSync(this.password);
  // }
}
