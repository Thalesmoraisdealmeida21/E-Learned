import { injectable, inject } from 'tsyringe';
import IPostRepository from '../repository/IPostRepository';
import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  name: string;
  description: string;
  resume: string;
  facebookLink: string;
  category: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute({
    name,
    description,
    resume,
    facebookLink,
    category,
  }: IRequest): Promise<Post | undefined> {
    const post = await this.postsRepository.create({
      name,
      description,
      resume,
      facebookLink,
      category,
    });

    return post;
  }
}

export default CreateUserService;
