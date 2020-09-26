import ICreatePostDTO from '../dtos/ICreatePostDTO';
import Post from '../infra/typeorm/entities/Post';

export default interface IPostRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  findOnePost(id: string): Promise<Post | undefined>;
  findAll(): Promise<Post[]>;
  search(search: string): Promise<Post[]>;
  save(post: Post): Promise<Post | undefined>;
  delete(id: string): Promise<void>;
}
