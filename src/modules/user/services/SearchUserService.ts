import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/user/infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class SearchUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    user_id: string,
    search?: string,
  ): Promise<User[] | undefined> {
    const userLogged = await this.usersRepository.findByUuid(user_id);

    if (!userLogged) {
      throw new AppError('This user does exist', 401);
    }
    if (userLogged.level !== 'ADM') {
      throw new AppError('this user dont have permission for this action', 401);
    }
    if (!search) {
      throw new AppError('Plis inform your search');
    }
    const users = await this.usersRepository.search(search);

    return users;
  }
}

export default SearchUserService;
