import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import ICoursesRepository from '../repository/ICoursesRepository';
import Course from '../infra/typeorm/entities/Course';

interface IRequest {
  course_id: string;
  description: string;
  name: string;
  price: number;
  videoLink: string;
  user_id: string;
}

@injectable()
class UpdateCourse {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    course_id,
    user_id,
    description,
    name,
    price,
    videoLink,
  }: IRequest): Promise<Course | undefined> {
    const course = await this.coursesRepository.findOne(course_id);
    const user = await this.usersRepository.findByUuid(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.level !== 'ADM') {
      throw new AppError('This user is not allowed to do this action', 401);
    }

    if (!course) {
      throw new AppError('Course not found');
    }

    course.name = name;
    course.description = description;
    course.price = price;
    course.videoLink = videoLink;

    return this.coursesRepository.save(course);
  }
}

export default UpdateCourse;
