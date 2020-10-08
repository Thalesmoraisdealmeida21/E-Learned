import Order from '@modules/order/infra/typeorm/entities/Order';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();

    if (orders.length <= 0) {
      throw new AppError('There are no registered orders');
    }

    return orders;
  }
}

export default CreateOrderService;
