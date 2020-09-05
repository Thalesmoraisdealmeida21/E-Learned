import { injectable, inject } from 'tsyringe';

// import ICoursesRepository from '@modules/course/repository/ICoursesRepository';
// import AppError from '@shared/errors/AppError';
import UsersCourses from '@modules/user/infra/typeorm/entities/UsersCourses';
// import { IUsersRepository } from '../repositories/IUsersRepository';
import IUsersCoursesRepository from '../repositories/IUsersCoursesRepository';

interface IRequest {
  user_id: string;
  course_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    // @inject('UsersRepository')
    // private usersRepository: IUsersRepository,

    // @inject('CoursesRepository')
    // private coursesRepository: ICoursesRepository,

    @inject('UsersCoursesRepository')
    private usersCoursesRepository: IUsersCoursesRepository,
  ) {}

  public async execute({
    user_id,
    course_id,
  }: IRequest): Promise<UsersCourses | undefined> {
    const userCourse = await this.usersCoursesRepository.addCourseToUser(
      user_id,
      course_id,
    );

    return userCourse;
  }
}

export default CreateUserService;
