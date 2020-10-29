import IUsersRepository from '@modules/user/repositories/IUsersRepository';

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IPaymentProvider from '@shared/container/providers/PaymentProvider/model/IPaymentProvider';
import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest {
  amount: number;
  payment_method: string;
  orderId: string;
  card_hash: string;
  user: User;
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
    card_hash,
    orderId,
    payment_method,
    user,
  }: IRequest): Promise<IResponse> {
    const orderForPay = await this.orderRepository.findById(orderId);

    if (!orderForPay) {
      throw new AppError('This order does not exist');
    }

    const customer = await this.usersRepository.findByUuid(orderForPay.userId);

    if (!customer) {
      throw new AppError('This Customer not found');
    }

    await this.usersRepository.save(user);

    if (!customer.cpfCnpj) {
      throw new AppError('Por favor informe um CPF / CNPJ');
    }
    const customerToPay: ICustomer = {
      type: 'individual',
      country: 'br',
      name: customer.name,
      documents: [
        {
          type: 'cpf',
          number: customer.cpfCnpj || '',
        },
      ],
    };

    let methodToPay = 'credit_card';

    if (payment_method === 'boleto') {
      methodToPay = 'boleto';
    }

    const transaction = await this.paymentProvider.pay({
      amount,
      card_hash,
      payment_method: methodToPay,
      customer: payment_method === 'boleto' ? customerToPay : undefined,
      billing: {
        name: user.name,
        address: {
          city: user.city,
          country: 'br',
          neighborhood: user.neighborhood,
          state: user.uf,
          street: user.address,
          street_number: user.addressNumber,
          zipcode: user.cep,
        },
      },
    });

    orderForPay.status = transaction.status;

    await this.orderRepository.save(orderForPay);

    return transaction;
  }
}

export default GenerateTransaction;
