import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';

import Order from '../entities/Order';

class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({
    user,
    courses,
  }: ICreateOrderDTO): Promise<Order | undefined> {
    const order = this.ormRepository.create({
      user,
      courses,
    });

    return order;
  }

  public async save(order: Order): Promise<void> {
    await this.ormRepository.save(order);
  }

  public async findAll(): Promise<Order[]> {
    const orders = await this.ormRepository.find();
    return orders;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      id,
    });

    return order;
  }
}

export default OrderRepository;
