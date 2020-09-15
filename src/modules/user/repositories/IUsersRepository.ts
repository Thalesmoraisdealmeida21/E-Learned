import User from '@modules/user/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUuid(id: string): Promise<User | undefined>;
  findAll(): Promise<User[] | undefined>;
  search(search: string): Promise<User[] | undefined>;
  findByIds(users: string[]): Promise<User[] | undefined>;
}
