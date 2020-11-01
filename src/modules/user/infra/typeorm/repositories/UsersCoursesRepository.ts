/* eslint-disable import/no-unresolved */
import { Repository, getRepository, In } from 'typeorm';
import IUsersCoursesRepository from '@modules/user/repositories/IUsersCoursesRepository';
import IAddCoursesToUserDTO from '@modules/user/dtos/IAddCoursesToUserDTO';
import { add } from 'date-fns';
import AppError from '@shared/errors/AppError';
import UsersCourses from '../entities/UsersCourses';

class UsersCourseRepository implements IUsersCoursesRepository {
  private ormRepository: Repository<UsersCourses>;

  constructor() {
    this.ormRepository = getRepository(UsersCourses);
  }

  public async resetLimit(course_id: string, user_id: string): Promise<void> {
    const courseToReset = await this.ormRepository.findOne({
      where: {
        course_id,
        user_id,
      },
    });

    if (!courseToReset) {
      throw new AppError('This Course does exists');
    } else {
      courseToReset.limitAccess = null;
    }

    await this.ormRepository.save(courseToReset);
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
        course_id: id,
      },
    });
    const date = new Date();

    const limitAccessUpdate = add(date, {
      days: 1,
    });

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
