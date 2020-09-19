import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
  cpfCnpj: string;
  address: string;
  neighborhood: string;
  city: string;
  uf: string;
  addressNumber: string;
  complement: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    telephone,
    cpfCnpj,
    address,
    neighborhood,
    city,
    uf,
    addressNumber,
    complement,
  }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findByUuid(id);

    if (!user) {
      throw new AppError('This user not found');
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.telephone = telephone;
    user.cpfCnpj = cpfCnpj;
    user.address = address;
    user.neighborhood = neighborhood;
    user.city = city;
    user.uf = uf;
    user.addressNumber = addressNumber;
    user.complement = complement;

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
