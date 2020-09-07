import { Repository, getRepository, In } from 'typeorm';
import IUsersCoursesRepository from '@modules/user/repositories/IUsersCoursesRepository';
import IAddCoursesToUserDTO from '@modules/user/dtos/IAddCoursesToUserDTO';
import { add } from 'date-fns';
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

  public async updateLimitAccess(id: string): Promise<void> {
    const courseToUpdate = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    const validDate = new Date();

    const limitAccessUpdate = add(validDate, {
      days: 1,
    });

    console.log(limitAccessUpdate);

    await this.ormRepository.save({
      ...courseToUpdate,
      limitAccess: limitAccessUpdate,
    });
  }

  public async findCoursesByIds(
    ids: string[],
    user_id: string,
  ): Promise<UsersCourses[]> {
    const coursesFound = await this.ormRepository.find({
      where: {
        course_id: In(ids),
        user_id,
      },
    });

    return coursesFound;
  }

  public async addCourseToUser(
    dataCourses: IAddCoursesToUserDTO[],
  ): Promise<UsersCourses[]> {
    const userCourses = this.ormRepository.create(dataCourses);

    await this.ormRepository.save(userCourses);

    return userCourses;
  }

  public async findCourseOfUser(
    user_id: string,
    course_id: string,
  ): Promise<UsersCourses[]> {
    const coursesIds = await this.ormRepository.find({
      where: {
        user_id,
        course_id,
      },
    });

    return coursesIds;
  }
}

export default UsersCourseRepository;
