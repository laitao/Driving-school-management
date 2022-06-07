import { UserService } from './../user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly UserService: UserService,
  ) {}

  // 生成token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  async login(user) {
    const existUser = await this.UserService.findById(user.id);
    const token = this.createToken({
      id: existUser.id,
      username: existUser.username,
      role: existUser.role,
    });
    return { token };
  }
}
