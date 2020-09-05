import UsersCourses from '../infra/typeorm/entities/UsersCourses';

export default interface IUsersCoursesRepository {
  findAllByUser(user_id: string): Promise<UsersCourses[]>;
  addCourseToUser(user_id: string, course_id: string): Promise<UsersCourses>;
}
