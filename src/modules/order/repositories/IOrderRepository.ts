import Order from '@modules/order/infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
// import ICreateUserDTO from '../dtos/ICreateorderDTO';

export default interface IOrderRepository {
  create(data: ICreateOrderDTO): Promise<Order | undefined>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
}
