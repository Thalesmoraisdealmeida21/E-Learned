import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

import ICoursesRepository from '@modules/course/repository/ICoursesRepository';
import CourseRepository from '@modules/course/infra/typeorm/repositories/CourseRepository';

import IUsersCoursesRepository from '@modules/user/repositories/IUsersCoursesRepository';
import UsersCoursesRepository from '@modules/user/infra/typeorm/repositories/UsersCoursesRepository';

import IPostRepository from '@modules/post/repository/IPostRepository';
import PostRepository from '@modules/post/infra/typeorm/repositories/PostRepository';
import IMailProvider from './providers/MailProvider/models/IMailProvider';
import mailsProvider from './providers/MailProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CourseRepository,
);

container.registerSingleton<IUsersCoursesRepository>(
  'UsersCoursesRepository',
  UsersCoursesRepository,
);

container.registerSingleton<IPostRepository>('PostsRepository', PostRepository);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailsProvider[mailConfig.driver],
);
