import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '手机号', example: '15216637791' })
  @IsNotEmpty({ message: '手机号必填' })
  readonly phone: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string;
}
