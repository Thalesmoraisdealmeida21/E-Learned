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
    const courses = await this.coursesRepository.listAllCourses();

    const coursNew = courses.map(cors => {
      const coursReturn = { ...cors, videoLink: 'inacessivel' };
      return coursReturn;
    });

    return coursNew;
  }
}

export default CreateUserService;
