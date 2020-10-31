import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '@modules/order/services/CreateOrderService';

import ListAllOrdersService from '@modules/order/services/ListAllOrdersService';
import ListOneOrderService from '@modules/order/services/ListOneOrderService';

import CreateTransaction from '@modules/order/services/GenerateTransaction';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);

    const { userId, courses } = request.body;

    const order = await createOrder.execute({ courses, userId });

    return response.json(order);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAllOrders = container.resolve(ListAllOrdersService);

    const orders = await listAllOrders.execute();

    return response.json(orders);
  }

  public async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listOneOrder = container.resolve(ListOneOrderService);

    const { orderId } = request.params;

    const order = await listOneOrder.execute(orderId);

    return response.json(order);
  }

  public async pay(request: Request, response: Response): Promise<Response> {
    const { amount, card_hash, payment_method, user, items } = request.body;

    const { orderId } = request.params;

    const createTransaction = container.resolve(CreateTransaction);

    const transaction = await createTransaction.execute({
      amount,
      orderId,
      payment_method,
      card_hash,
      user,
      items,
    });

    return response.json(transaction);
  }
}
