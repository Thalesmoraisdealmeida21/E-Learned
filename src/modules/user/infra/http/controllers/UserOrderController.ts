import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListOrderUserService from '../../../services/ListOrdersUserService';

interface IRequest {
  course_id: string;
}
export default class UserOrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrder = container.resolve(ListOrderUserService);

    const { id } = request.user;

    const orders = await listOrder.execute(id);

    return response.json(orders);
  }
}
