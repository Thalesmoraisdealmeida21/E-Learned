import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IPostRepository from '../repository/IPostRepository';

interface IRequest {
  postImageFileName: string;
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ postImageFileName }: IRequest): Promise<{url: string, file: string}> {
    const imageUrl = `${process.env.APP_API_URL}/files/${postImageFileName}`;

  
    

    return { url: imageUrl, file: postImageFileName};
  }
}

export default UpdatePostService;
