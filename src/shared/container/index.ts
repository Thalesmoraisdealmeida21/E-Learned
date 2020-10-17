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

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository';

import IMailProvider from './providers/MailProvider/models/IMailProvider';
import mailsProvider from './providers/MailProvider';

import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';

import IPaymentProvider from './providers/PaymentProvider/model/IPaymentProvider';
import PagarmeProvider from './providers/PaymentProvider/implementation/PagarmeProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IPostRepository>('PostsRepository', PostRepository);

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CourseRepository,
);

container.registerSingleton<IUsersCoursesRepository>(
  'UsersCoursesRepository',
  UsersCoursesRepository,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailsProvider[mailConfig.driver],
);

container.registerSingleton<IPaymentProvider>(
  'PaymentProvider',
  PagarmeProvider,
);
