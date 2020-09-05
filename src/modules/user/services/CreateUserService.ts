import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const emailExists = await this.usersRepository.findByEmail(email);

    console.log(emailExists);

    if (emailExists) {
      throw new AppError('This e-mail already in use');
    }

    const passwordEncrypted = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      name,
      password: passwordEncrypted,
    });

    return user;
  }
}

export default CreateUserService;
