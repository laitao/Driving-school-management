import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

export interface PostsRo {
  list: UserEntity[];
  count: number;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly postsRepository: Repository<UserEntity>,
  ) {}

  // 创建用户
  async create(post: Partial<UserEntity>): Promise<UserEntity> {
    const { username, phone } = post;
    console.log(post);
    if (!username) {
      throw new HttpException('请输入用户名', 401);
    }
    // 用户名和手机号都重复，表示用户存在
    const doc = await this.postsRepository.findOne({
      where: { username, phone },
    });
    if (doc) {
      throw new HttpException('用户已存在', 400);
    }
    const salt = await bcrypt.genSaltSync(10);
    post.password = await bcrypt.hashSync(post.password, salt);
    const res = await this.postsRepository.save(post);
    delete res.password;
    return res;
  }

  // 获取用户列表
  async findAll(query): Promise<PostsRo> {
    const { page = 1, pageSize = 10 } = query;
    const [list, count] = await this.postsRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { list, count };
  }

  // 获取指定用户信息
  async findById(id): Promise<UserEntity> {
    console.log('id===', id);
    return await this.postsRepository.findOne({ where: { id } });
  }

  // 更新用户
  async updateById(post): Promise<UserEntity> {
    const { id } = post;
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的用户不存在`, 400);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  // 刪除用户
  async remove(id) {
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的用户不存在`, 401);
    }
    return await this.postsRepository.remove(existPost);
  }
}
