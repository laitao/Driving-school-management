import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
interface route {
  [key: string]: any;
}

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

  @Column('simple-json', { default: null })
  routes: route;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = await bcrypt.hashSync(hash);
    console.log('this.password=', this.password);
  }
}
