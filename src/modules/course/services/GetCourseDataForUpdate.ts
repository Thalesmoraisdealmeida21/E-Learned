import { injectable, inject } from 'tsyringe';
import IUsersCoursesRepository from '@modules/user/repositories/IUsersCoursesRepository';
import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import ICoursesRepository from '../repository/ICoursesRepository';
import Course from '../infra/typeorm/entities/Course';

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
  }: IRequest): Promise<Course | undefined> {
    const userLogged = await this.usersRepository.findByUuid(user_id);

    if (!userLogged) {
      throw new AppError('User not found', 401);
    }

    if (userLogged.level !== 'ADM') {
      throw new AppError('This user does have permission access this course');
    }

    const course = await this.coursesRepository.findOne(course_id);

    return course;
  }
}

export default CreateUserService;
