import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from './user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly postsRepository: Repository<UserEntity>,
  ) {}

  // 生成token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  async login({ id }) {
    const existUser = await this.postsRepository.findOne({ where: { id } });
    const token = this.createToken({
      id: existUser.id,
      username: existUser.username,
      role: existUser.role,
    });
    return { token };
  }
}
