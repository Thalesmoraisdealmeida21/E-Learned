import { injectable, inject } from 'tsyringe';
import IUsersCoursesRepository from '@modules/user/repositories/IUsersCoursesRepository';
import AppError from '@shared/errors/AppError';
import ICoursesRepository from '../repository/ICoursesRepository';
import Course from '../infra/typeorm/entities/Course';

interface IRequest {
  course_id: string;
  user_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('UsersCoursesRepository')
    private usersCoursesRepository: IUsersCoursesRepository,
  ) {}

  public async execute({
    course_id,
    user_id,
  }: IRequest): Promise<Course | undefined> {
    console.log(course_id, user_id);
    const userHavePermission = await this.usersCoursesRepository.findCourseOfUser(
      user_id,
      course_id,
    );

    if (userHavePermission.length <= 0) {
      throw new AppError('This user does have permission access this course');
    }

    console.log(userHavePermission[0].limitAccess);
    if (userHavePermission[0].limitAccess !== null) {
      if (userHavePermission[0].limitAccess <= new Date()) {
        throw new AppError('This course is at expired');
      }
    }

    const course = await this.coursesRepository.findOne(course_id);

    return course;
  }
}

export default CreateUserService;
