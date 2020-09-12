import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/user/infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ListAllUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User[] | undefined> {
    const userLogged = await this.usersRepository.findByUuid(user_id);

    if (!userLogged) {
      throw new AppError('This user does exist', 401);
    }
    if (userLogged.level !== 'ADM') {
      throw new AppError('this user dont have permission for this action', 401);
    }

    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListAllUserService;
