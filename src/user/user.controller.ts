import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  async create(@Body() data) {
    return await this.userService.create(data);
  }
  @Get('findAll')
  async findAll(@Query() query) {
    console.log('data====', query);
    return await this.userService.findAll(query);
  }
  @Get('findById')
  async findById(@Query('id') id) {
    return await this.userService.findById(id);
  }
  @Put('updateById')
  async update(@Body() post) {
    return await this.userService.updateById(post);
  }
  @Delete('remove')
  async remove(@Query('id') id) {
    return await this.userService.remove(id);
  }
}
