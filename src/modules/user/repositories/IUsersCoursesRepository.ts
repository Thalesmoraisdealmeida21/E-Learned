import UsersCourses from '../infra/typeorm/entities/UsersCourses';

import IAddCoursesToUserDTO from '../dtos/IAddCoursesToUserDTO';

export default interface IUsersCoursesRepository {
  findAllByUser(user_id: string): Promise<UsersCourses[]>;
  addCourseToUser(courses: IAddCoursesToUserDTO[]): Promise<UsersCourses[]>;
  findCourseOfUser(course_id: string, user_id: string): Promise<UsersCourses[]>;
  findCoursesByIds(
    courses_ids: string[],
    user_id: string,
  ): Promise<UsersCourses[]>;
  updateLimitAccess(course_id: string, user_id: string): Promise<void>;
  resetLimit(course_id: string, user_id: string): Promise<void>;
}
