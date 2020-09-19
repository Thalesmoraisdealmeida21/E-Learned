import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { Repository, getRepository, Like, In } from 'typeorm';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(dataUser: ICreateUserDTO): Promise<User | undefined> {
    const user = this.ormRepository.create(dataUser);

    await this.ormRepository.save(user);
    delete user.password;

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findByUuid(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async search(search: string): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({
      where: [
        { name: Like(`%${search}%`) },
        { email: Like(`%${search}%`) },
        { city: Like(`%${search}%`) },
        { telephone: Like(`%${search}%`) },
        { address: Like(`%${search}%`) },
        { neighborhood: Like(`%${search}%`) },
      ],
    });

    return users;
  }

  public async findByIds(usersIds: string[]): Promise<User[] | undefined> {
    const users = this.ormRepository.find({
      where: {
        id: In(usersIds),
      },
    });

    return users;
  }
}

export default UsersRepository;
