import { injectable, inject } from 'tsyringe';
import IPostRepository from '../repository/IPostRepository';
import Post from '../infra/typeorm/entities/Post';

@injectable()
class ListAllPosts {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute(): Promise<Post[]> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}

export default ListAllPosts;
