import IUsersCoursesRepository from '@modules/user/repositories/IUsersCoursesRepository';
import { injectable, inject } from 'tsyringe';
import IOrderCourseRepositoru from '@modules/order/repositories/IOrderCoursesRepository';
import ICoursesRepository from '../repository/ICoursesRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('UsersCoursesRepository')
    private usersCourses: IUsersCoursesRepository,

    @inject('OrderCoursesRepository')
    private ordersCourses: IOrderCourseRepositoru,
  ) {}

  public async execute(courseId: string): Promise<void> {
    await this.usersCourses.deleteCourse(courseId);

    await this.coursesRepository.desactivate(courseId);
  }
}

export default CreateUserService;
