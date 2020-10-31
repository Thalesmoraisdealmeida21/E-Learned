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
  items: [
    {
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
      tangible: boolean;
    },
  ];
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
  external_id: string;
  type: string;
  country: string;
  name: string;
  email: string;
  phone_numbers: string[];

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
    items,
  }: IRequest): Promise<IResponse> {
    const orderForPay = await this.orderRepository.findById(orderId);

    if (!orderForPay) {
      throw new AppError('This order does not exist');
    }

    const customer = await this.usersRepository.findByUuid(orderForPay.userId);

    if (!customer) {
      throw new AppError('This Customer not found');
    }

    const userUpdated = await this.usersRepository.save(user);

    console.log(userUpdated);

    if (!customer.cpfCnpj) {
      throw new AppError('Por favor informe um CPF / CNPJ');
    }

    const customerToPay: ICustomer = {
      type: 'individual',
      external_id: userUpdated.id,
      country: 'br',
      email: userUpdated.email,
      name: userUpdated.name,
      phone_numbers: [userUpdated.telephone],
      documents: [
        {
          type: 'cpf',
          number: userUpdated.cpfCnpj.replace(/(\.|\/|-)/g, '') || '',
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
      customer: customerToPay,
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
      items,
    });

    orderForPay.status = transaction.status;

    if (transaction.status === 'refused') {
      throw new AppError('transaction refused');
    }

    await this.orderRepository.save(orderForPay);

    return transaction;
  }
}

export default GenerateTransaction;
