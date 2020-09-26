import { injectable, inject } from 'tsyringe';
import IPostRepository from '../repository/IPostRepository';

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}

export default DeletePostService;
