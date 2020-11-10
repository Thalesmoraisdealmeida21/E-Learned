import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import Course from '@modules/course/infra/typeorm/entities/Course';
import ICoursesRepository from '../repository/ICoursesRepository';

interface IRequest {
  course_id: string;
  description: string;
  name: string;
  price: number;
  videoLink: string;
  user_id: string;
  resume: string;
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
    resume,
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
    course.resume = resume;

    console.log(resume);

    return this.coursesRepository.save(course);
  }
}

export default UpdateCourse;
