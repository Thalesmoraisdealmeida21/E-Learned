import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPostRepository from '../repository/IPostRepository';
import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  name: string;
  description: string;
  resume: string;
  facebookLink: string;
  category: string;
  image: string;
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
    image,
  }: IRequest): Promise<Post | undefined> {
    const postName = await this.postsRepository.findByName(name);
    if (postName) {
      throw new AppError('This name post already in use');
    }
    const post = await this.postsRepository.create({
      name,
      description,
      resume,
      facebookLink,
      category,
      image,
    });

    return post;
  }
}

export default CreateUserService;
