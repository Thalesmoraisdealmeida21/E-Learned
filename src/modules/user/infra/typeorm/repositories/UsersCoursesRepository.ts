import { Repository, getRepository } from 'typeorm';
import IUsersCoursesRepository from '@modules/user/repositories/IUsersCoursesRepository';
import UsersCourses from '../entities/UsersCourses';

class UsersCourseRepository implements IUsersCoursesRepository {
  private ormRepository: Repository<UsersCourses>;

  constructor() {
    this.ormRepository = getRepository(UsersCourses);
  }

  public async findAllByUser(user_id: string): Promise<UsersCourses[]> {
    const course = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return course;
  }

  public async addCourseToUser(
    user_id: string,
    course_id: string,
  ): Promise<UsersCourses> {
    const userCourse = this.ormRepository.create({
      course_id,
      user_id,
    });

    await this.ormRepository.save(userCourse);

    return userCourse;
  }
}

export default UsersCourseRepository;
