import { AuthService } from './auth.service';
import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/auth/dto/login.dto';

@ApiTags('身份验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '登陆' })
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return await this.AuthService.login(req.user);
  }
}
