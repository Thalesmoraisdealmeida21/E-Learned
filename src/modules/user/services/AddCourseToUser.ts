import { injectable, inject } from 'tsyringe';

// import ICoursesRepository from '@modules/course/repository/ICoursesRepository';
// import AppError from '@shared/errors/AppError';
import UsersCourses from '@modules/user/infra/typeorm/entities/UsersCourses';
// import { IUsersRepository } from '../repositories/IUsersRepository';
// import AppError from '@shared/errors/AppError';

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

    if (existentCourses) {
      existentCourses.forEach(cours => {
        this.usersCoursesRepository
          .resetLimit(cours.course_id, cours.user_id)
          .then(() => {
            console.log('inseriu');
          });
      });
    }

    const coursIdsFound = existentCourses.map(cours => {
      return { course_id: cours.course_id, user_id: cours.user_id };
    });

    const coursesToInserExceptYesHave = coursesToInsert.filter(cours => {
      if (coursIdsFound.length <= 0) {
        return true;
      }

      coursIdsFound.forEach(exist => {
        if (
          exist.course_id === cours.course_id &&
          exist.user_id === cours.user_id
        ) {
          return true;
        }
        return false;
      });
    });

    const userCourses = await this.usersCoursesRepository.addCourseToUser(
      coursesToInserExceptYesHave,
    );
    return userCourses;
  }
}

export default CreateUserService;
