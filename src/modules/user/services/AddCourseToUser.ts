import { injectable, inject } from 'tsyringe';

// import ICoursesRepository from '@modules/course/repository/ICoursesRepository';
// import AppError from '@shared/errors/AppError';
import UsersCourses from '@modules/user/infra/typeorm/entities/UsersCourses';
// import { IUsersRepository } from '../repositories/IUsersRepository';
// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import IUsersCoursesRepository from '../repositories/IUsersCoursesRepository';

interface IRequest {
  user_id: string;
  course_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersCoursesRepository')
    private usersCoursesRepository: IUsersCoursesRepository,
  ) {}

  public async execute(
    coursesToInsert: IRequest[],
  ): Promise<UsersCourses[] | undefined> {
    const coursesIds = coursesToInsert.map(cours => {
      return cours.course_id;
    });

    const existentCourses = await this.usersCoursesRepository.findCoursesByIds(
      coursesIds,
      coursesToInsert[0].user_id,
    );

    if (existentCourses.length <= 0) {
      const userCourses = await this.usersCoursesRepository.addCourseToUser(
        coursesToInsert,
      );
      return userCourses;
    }

    throw new AppError(`You already have this course: ${UsersCourses}`);
  }
}

export default CreateUserService;
