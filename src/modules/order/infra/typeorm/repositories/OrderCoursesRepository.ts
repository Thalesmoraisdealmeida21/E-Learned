import IOrderCoursesRepository from '@modules/order/repositories/IOrderCoursesRepository';
import { Repository, getRepository } from 'typeorm';

import OrderCourses from '../entities/OrderCourses';

class OrderCoursesRepositoru implements IOrderCoursesRepository {
  private ormRepository: Repository<OrderCourses>;

  constructor() {
    this.ormRepository = getRepository(OrderCourses);
  }

  public async delete(course: string): Promise<void> {
    await this.ormRepository.delete(course);
  }
}

export default OrderCoursesRepositoru;
