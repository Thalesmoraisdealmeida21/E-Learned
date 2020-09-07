import { injectable, inject } from 'tsyringe';

// import ICoursesRepository from '@modules/course/repository/ICoursesRepository';
// import AppError from '@shared/errors/AppError';
// import UsersCourses from '@modules/user/infra/typeorm/entities/UsersCourses';
import { IUsersRepository } from '../repositories/IUsersRepository';
import IUsersCoursesRepository from '../repositories/IUsersCoursesRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    // @inject('CoursesRepository')
    // private coursesRepository: ICoursesRepository,

    @inject('UsersCoursesRepository')
    private usersCoursesRepository: IUsersCoursesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User | undefined> {
    const coursesUser = await this.usersRepository.findByUuid(user_id);

    // if (coursesUser?.Courses.length <= 0) {
    //   throw new AppError("Doe's not exist cours for this user");
    // }

    delete coursesUser?.password;

    return coursesUser;
  }
}

export default CreateUserService;
