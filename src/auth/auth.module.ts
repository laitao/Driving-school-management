import { UserService } from './../user/user.service';
import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStorage } from './local.strategy';
import { JwtStorage } from './jwt.strategy';
// 注册token信息
const jwtModule: DynamicModule = JwtModule.register({
  secret: 'latiao123456',
  signOptions: { expiresIn: '24h' },
});

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, jwtModule],
  exports: [jwtModule, AuthService],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage, UserService],
})
export class AuthModule {}
