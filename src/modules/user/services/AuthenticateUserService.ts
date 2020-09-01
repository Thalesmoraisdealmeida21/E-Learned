import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import User from '@modules/user/infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ password, email }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This E-mail is not exists', 401);
    }

    const passwordMatched = compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('This Password is wrong', 401);
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

export default CreateUserService;
