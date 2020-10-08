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

  public async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default CreateOrderService;
