import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListAllUsersService';
import GetOneUserService from '@modules/user/services/GetOneUser';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);
    const { name, email, password } = request.body;

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);
    const user_id = request.user.id;

    const user = await listUsers.execute(user_id);

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_logged = request.user.id;

    const { user_id } = request.params;

    const getOneUser = container.resolve(GetOneUserService);

    const user = await getOneUser.execute(user_id, user_logged);

    delete user?.password;

    return response.json(user);
  }
}
