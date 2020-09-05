import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { Repository, getRepository } from 'typeorm';
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
}

export default UsersRepository;
