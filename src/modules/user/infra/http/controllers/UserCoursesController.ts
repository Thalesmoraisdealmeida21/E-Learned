import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCourses from '@modules/user/services/ListAllCourses';
import AddCourseToUserService from '@modules/user/services/AddCourseToUser';

export default class UsersCourses {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllCourses = container.resolve(ListAllCourses);
    const user_id = request.user.id;

    const user = await listAllCourses.execute({ user_id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const addCourseToUser = container.resolve(AddCourseToUserService);
    const user_id = request.user.id;
    const { course_id } = request.body;

    const user = await addCourseToUser.execute({ user_id, course_id });

    return response.json(user);
  }
}
