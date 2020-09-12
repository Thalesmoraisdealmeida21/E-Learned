import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCourseService from '@modules/course/services/CreateCourseService';
import ListAllCourses from '@modules/course/services/ListAllCourses';
import UpdateCourse from '@modules/course/services/UpdateCourse';
import GetCourseDataService from '@modules/course/services/GetCourseDataService';

import GetCourseDataForUpdate from '@modules/course/services/GetCourseDataForUpdate';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCourse = container.resolve(CreateCourseService);
    const { name, description, price, videoLink } = request.body;

    const course = await createCourse.execute({
      name,
      description,
      price,
      videoLink,
    });

    return response.json(course);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllCourses = container.resolve(ListAllCourses);

    const courses = await listAllCourses.execute();

    return response.json(courses);
  }

  public async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const course_id = request.params.id;
    const getOneCourse = container.resolve(GetCourseDataService);

    const courses = await getOneCourse.execute({ course_id, user_id: id });

    return response.json(courses);
  }

  public async findOneByAdmin(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const course_id = request.params.id;
    const getOneCourse = container.resolve(GetCourseDataForUpdate);

    const courses = await getOneCourse.execute({ course_id, user_id: id });

    return response.json(courses);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { course_id } = request.params;
    const user_id = request.user.id;
    const { name, description, price, videoLink } = request.body;

    const updateCourse = container.resolve(UpdateCourse);

    const courseUpdated = await updateCourse.execute({
      course_id,
      user_id,
      description,
      name,
      price,
      videoLink,
    });

    return response.json(courseUpdated);
  }
}
