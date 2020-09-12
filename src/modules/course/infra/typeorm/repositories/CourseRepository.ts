import ICoursesRepository from '@modules/course/repository/ICoursesRepository';
import ICreateCourseDTO from '@modules/course/dtos/ICreateCourseDTO';
import { Repository, getRepository, In } from 'typeorm';
import Course from '../entities/Course';

class CourseRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async create(
    dataCourse: ICreateCourseDTO,
  ): Promise<Course | undefined> {
    const course = this.ormRepository.create(dataCourse);

    await this.ormRepository.save(course);

    return course;
  }

  public async listAllCourses(): Promise<Course[]> {
    const courses = await this.ormRepository.find();

    return courses;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findOne(id: string): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return course;
  }

  public async findAllByIds(
    userCourses: string[],
  ): Promise<Course[] | undefined> {
    const courses = await this.ormRepository.find({
      where: {
        id: In(userCourses),
      },
    });

    return courses;
  }

  public async save(course: Course): Promise<Course> {
    return this.ormRepository.save(course);
  }
}

export default CourseRepository;
