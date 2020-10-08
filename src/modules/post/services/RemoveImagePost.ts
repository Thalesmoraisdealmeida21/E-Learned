import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IPostRepository from '../repository/IPostRepository';

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const post = await this.postsRepository.findOnePost(id);

    if (!post) {
      throw new AppError('Post not found');
    }

    this.storageProvider.deleteFile(post.image);
    post.image = '';

    await this.postsRepository.save(post);
  }
}

export default DeletePostService;
