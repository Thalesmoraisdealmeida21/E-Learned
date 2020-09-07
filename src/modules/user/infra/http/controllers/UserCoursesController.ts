import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCourses from '@modules/user/services/ListAllCourses';
import AddCourseToUserService from '@modules/user/services/AddCourseToUser';
import UpdateLimitCourse from '@modules/user/services/UpdateLimitAccessService';

interface IRequest {
  course_id: string;
}
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
    const { courses } = request.body;

    const coursesToInser: IRequest[] = courses;

    const UsersCoursesToInsert = coursesToInser.map(course => {
      return { user_id, course_id: course.course_id };
    });

    const coursesToInserted = await addCourseToUser.execute(
      UsersCoursesToInsert,
    );

    return response.json(coursesToInserted);
  }

  public async updateLimit(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateLimit = container.resolve(UpdateLimitCourse);

    const { course_id } = request.body;

    await updateLimit.execute(course_id);

    return response.json({});
  }
}
