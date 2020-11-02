import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Order from '@modules/order/infra/typeorm/entities/Order';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';

@injectable()
class ListAllUserService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(userId: string): Promise<Order[]> {
    const orders = await this.orderRepository.findByUser(userId);

    const orderWithTotal = orders.map(ord => {
      const { total } = ord.courses.reduce(
        (accumulator, course) => {
          accumulator.total += Number(course.price);
          return accumulator;
        },
        {
          total: 0,
        },
      );

      return { ...ord, total };
    });

    // const { total } = orders.courses.reduce(
    //   (accumulator, course) => {
    //     accumulator.total += Number(course.price);
    //     return accumulator;
    //   },
    //   {
    //     total: 0,
    //   },
    // );

    if (!orderWithTotal) {
      throw new AppError('Enouth order found');
    }

    return orderWithTotal;
  }
}

export default ListAllUserService;
