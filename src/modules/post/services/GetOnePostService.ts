import { injectable, inject } from 'tsyringe';
import IPostRepository from '../repository/IPostRepository';
import Post from '../infra/typeorm/entities/Post';

@injectable()
class GetOnePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute(id: string): Promise<Post | undefined> {
    const post = await this.postsRepository.findOnePost(id);
    return post;
  }
}

export default GetOnePostService;
