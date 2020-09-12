import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import Course from '../infra/typeorm/entities/Course';

export default interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course | undefined>;
  listAllCourses(): Promise<Course[]>;
  findOne(id: string): Promise<Course | undefined>;
  delete(id: string): Promise<void>;
  findAllByIds(userCourses: string[]): Promise<Course[] | undefined>;
  save(course: Course): Promise<Course>;
}
