import { injectable, inject } from 'tsyringe';
import IUsersCoursesRepository from '@modules/user/repositories/IUsersCoursesRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import ICoursesRepository from '../repository/ICoursesRepository';

interface IRequest {
  course_id: string;
  user_id: string;
}

interface ICourseData {
  limitAccess: Date;
  id: string;
  name: string;
  price: number;
  description: string;
  videoLink: string;
  created_at: Date;
  updated_at: Date;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('UsersCoursesRepository')
    private usersCoursesRepository: IUsersCoursesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    course_id,
    user_id,
  }: IRequest): Promise<ICourseData | undefined> {
    const userHavePermission = await this.usersCoursesRepository.findCourseOfUser(
      user_id,
      course_id,
    );

    const userLogged = await this.usersRepository.findByUuid(user_id);

    console.log(userLogged);

    if (!userLogged) {
      throw new AppError('User not found', 401);
    }

    if (userHavePermission.length <= 0) {
      throw new AppError('This user does have permission access this course');
    }

    if (userHavePermission[0].limitAccess !== null) {
      if (userHavePermission[0].limitAccess <= new Date()) {
        throw new AppError('This course is at expired');
      }
    }

    const courseData = await this.coursesRepository.findOne(course_id);

    const course = {
      ...courseData,
      limitAccess: userHavePermission[0].limitAccess,
    };

    return course as ICourseData;
  }
}

export default CreateUserService;
