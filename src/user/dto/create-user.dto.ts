import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isMobilePhone } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string;

  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsNotEmpty({ message: '手机号必填' })
  readonly phone: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string;

  @ApiProperty({ description: '头像' })
  readonly avatar: string;
}
