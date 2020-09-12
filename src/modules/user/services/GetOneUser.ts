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

  public async execute(
    user_id: string,
    user_logged: string,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findByUuid(user_id);
    const userLogged = await this.usersRepository.findByUuid(user_id);

    if (!userLogged) {
      throw new AppError('You dont have a permission for this action', 401);
    }

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ListAllUserService;
