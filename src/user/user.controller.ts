import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @ApiOperation({ summary: '查找所有用户' })
  @Get('findAll')
  async findAll(@Query() query) {
    console.log('data====', query);
    return await this.userService.findAll(query);
  }
  @ApiOperation({ summary: '根据ID查找用户' })
  @Get('findById')
  async findById(@Query('id') id) {
    return await this.userService.findById(id);
  }
  @ApiOperation({ summary: '根据ID更新用户' })
  @Put('updateById')
  async update(@Body() post) {
    return await this.userService.updateById(post);
  }
  @ApiOperation({ summary: '根据ID删除用户' })
  @Delete('remove')
  async remove(@Query('id') id) {
    return await this.userService.remove(id);
  }
}
