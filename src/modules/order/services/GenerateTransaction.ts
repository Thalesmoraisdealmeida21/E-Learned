import IUsersRepository from '@modules/user/repositories/IUsersRepository';

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IPaymentProvider from '@shared/container/providers/PaymentProvider/model/IPaymentProvider';

interface IRequest {
  amount: number;
  card_number?: string;
  card_cvv?: string;
  card_expiration_date?: string;
  card_holder_name?: string;
  payment_method: string;
  orderId: string;
}

interface IResponse {
  status: string;
  payment_method: string;
  boleto_url: string;
  boleto_barcode: string;
  id: string;
  boleto_expiration_date: string;
}

interface ICustomer {
  type: string;
  country: string;
  name: string;
  documents: IDocument[];
}

interface IDocument {
  type: string;
  number: string;
}

@injectable()
class GenerateTransaction {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider,
  ) {}

  public async execute({
    amount,
    card_number,
    card_cvv,
    card_expiration_date,
    card_holder_name,
    orderId,
    payment_method,
  }: IRequest): Promise<IResponse> {
    const orderForPay = await this.orderRepository.findById(orderId);

    if (!orderForPay) {
      throw new AppError('This order does not exist');
    }

    const customer = await this.usersRepository.findByUuid(orderForPay.userId);

    if (!customer) {
      throw new AppError('This Customer not found');
    }

    const customerToPay: ICustomer = {
      type: 'individual',
      country: 'br',
      name: customer.name,
      documents: [
        {
          type: 'cpf',
          number: customer.cpfCnpj || '03809764043',
        },
      ],
    };

    let methodToPay = 'credit_card';

    if (payment_method === 'boleto') {
      methodToPay = 'boleto';
    }

    const transaction = await this.paymentProvider.pay({
      amount,
      card_number,
      card_cvv,
      card_expiration_date,
      card_holder_name,
      payment_method: methodToPay,
      customer: payment_method === 'boleto' ? customerToPay : undefined,
    });

    console.log(amount);
    orderForPay.status = transaction.status;

    await this.orderRepository.save(orderForPay);

    return transaction;
  }
}

export default GenerateTransaction;
