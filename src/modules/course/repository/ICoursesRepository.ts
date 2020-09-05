import ICreateCourseDTO from '../dtos/ICreateCourseDTO';
import Course from '../infra/typeorm/entities/Course';

export default interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course | undefined>;
  listAllCourses(): Promise<Course[]>;
  delete(id: string): Promise<void>;
  // update(data: ICreateUserDTO)
  // listCoursesByUser(): Promise<Course>;
}
