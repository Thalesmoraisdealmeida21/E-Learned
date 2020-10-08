import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IPostRepository from '../repository/IPostRepository';
import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  id: string;
  name: string;
  description: string;
  resume: string;
  facebookLink: string;
  category: string;
  image: string;
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    name,
    description,
    resume,
    facebookLink,
    category,
    image,
  }: IRequest): Promise<Post | undefined> {
    const post = await this.postsRepository.findOnePost(id);

    if (!post) {
      throw new AppError('This post not found');
    }

    post.name = name;
    post.category = category;
    post.description = description;
    post.resume = resume;
    post.facebookLink = facebookLink;
    post.image = image;

    if (image) {
      this.storageProvider.deleteFile(post.image);
    }

    const postSaved = await this.postsRepository.save(post);

    return postSaved;
  }
}

export default UpdatePostService;
