import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// eslint-disable-next-line import/no-unresolved
import Course from '@modules/course/infra/typeorm/entities/Course';
// eslint-disable-next-line import/no-unresolved
import IUsersRepository from '@modules/course/repository/ICoursesRepository';
import { isPast } from 'date-fns';
import IUsersCoursesRepository from '../repositories/IUsersCoursesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: IUsersRepository,

    @inject('UsersCoursesRepository')
    private usersCoursesRepository: IUsersCoursesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Course[] | undefined> {
    const coursesUser = await this.usersCoursesRepository.findAllByUser(
      user_id,
    );

    if (coursesUser.length <= 0) {
      throw new AppError('Nenhum curso encontrado');
    }

    const coursesToList = coursesUser.filter(course => {
      return !isPast(course.limitAccess);
    });

    const coursesIdsExpired = coursesToList.map(courseFound => {
      return courseFound.course_id;
    });

    const coursesIds = coursesUser.map(courseFound => {
      return courseFound.course_id;
    });

    const coursesUserData = await this.coursesRepository.findAllByIds(
      coursesIds,
    );

    const courses = coursesUserData?.map(course => {
      if (coursesIdsExpired.includes(course.id)) {
        return { ...course, expired: false };
      }
      return { ...course, expired: true };
    });

    return courses;
  }
}

export default CreateUserService;
