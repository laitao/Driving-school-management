import { AppService } from './app.service';
import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/auth/dto/login.dto';

@ApiTags('验证')
@Controller('auth')
export class AppController {
  constructor(private readonly AppService: AppService) {}
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiTags('登陆')
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return await this.AppService.login(req.user);
  }
}
