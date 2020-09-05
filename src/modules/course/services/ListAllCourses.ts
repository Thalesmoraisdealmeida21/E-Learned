import { injectable, inject } from 'tsyringe';
import ICoursesRepository from '../repository/ICoursesRepository';
import Course from '../infra/typeorm/entities/Course';

@injectable()
class CreateUserService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(): Promise<Course[] | undefined> {
    const courses = this.coursesRepository.listAllCourses();
    return courses;
  }
}

export default CreateUserService;
