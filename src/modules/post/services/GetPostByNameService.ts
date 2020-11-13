import { injectable, inject } from 'tsyringe';
import IPostRepository from '../repository/IPostRepository';
import Post from '../infra/typeorm/entities/Post';

@injectable()
class GetPostByNameService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute(name: string): Promise<Post | undefined> {
    const post = await this.postsRepository.findByName(name);

    return post;
  }
}

export default GetPostByNameService;
