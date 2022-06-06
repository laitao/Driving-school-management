import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

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
    if (!username) {
      throw new HttpException('请输入用户名', 401);
    }
    // 用户名和手机号都重复，表示用户存在
    const doc = await this.postsRepository.findOne({
      where: { username, phone },
    });
    if (doc) {
      throw new HttpException('用户已存在', 401);
    }
    return await this.postsRepository.save(post);
  }

  // 获取用户列表
  async findAll(query): Promise<PostsRo> {
    const qb = await getRepository(UserEntity).createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
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
      throw new HttpException(`id为${id}的用户不存在`, 401);
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
