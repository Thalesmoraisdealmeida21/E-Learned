import ICoursesRepository from '@modules/course/repository/ICoursesRepository';
import Order from '@modules/order/infra/typeorm/entities/Order';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  userId: string;
  courses: string[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ userId, courses }: IRequest): Promise<Order> {
    const user = await this.usersRepository.findByUuid(userId);

    if (!user) {
      throw new AppError('This user not found');
    }

    const orderCourses = await this.coursesRepository.findAllByIds(courses);

    if (!orderCourses) {
      throw new AppError('This courses does not exist');
    }
    if (orderCourses.length <= 0) {
      throw new AppError('This courses does not exist');
    }

    const order = await this.orderRepository.create({
      courses: orderCourses,
      user,
    });

    if (!order) {
      throw new AppError('Could not create order');
    }

    await this.orderRepository.save(order);

    return order;
  }
}

export default CreateOrderService;
