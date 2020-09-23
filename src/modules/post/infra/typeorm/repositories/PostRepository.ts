import { Repository, getRepository, Like } from 'typeorm';
import IPostRepository from '@modules/post/repository/IPostRepository';
import ICreatePostDTO from '../../../dtos/ICreatePostDTO';
import Post from '../entities/Post';

class PostRepository implements IPostRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create(data: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create(data);
    await this.ormRepository.save(post);
    return post;
  }

  public async findAll(): Promise<Post[]> {
    const posts = await this.ormRepository.find();

    return posts;
  }

  public async findOnePost(id: string): Promise<Post | undefined> {
    const postFound = await this.ormRepository.findOne({
      id,
    });

    return postFound;
  }

  public async search(search: string): Promise<Post[]> {
    const posts = await this.ormRepository.find({
      where: [
        { name: Like(search) },
        {
          resume: Like(search),
        },
      ],
    });

    return posts;
  }

  public async save(post: Post): Promise<Post | undefined> {
    const postSaved = await this.ormRepository.save(post);

    return postSaved;
  }
}

export default PostRepository;
