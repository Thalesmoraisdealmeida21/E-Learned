import pagarme from 'pagarme';
import ICreateTransaction from '@modules/order/dtos/ICreateTransaction';

import IPaymentProvider from '../model/IPaymentProvider';

export interface ITransaction {
  amount: number;
  card_number: string;
  card_cvv: string;
  card_expiration_date: string;
  card_holder_name: string;
}

interface IResponse {
  status: string;
  payment_method: string;
  boleto_url: string;
  boleto_barcode: string;
  id: string;
  boleto_expiration_date: string;
}

export default class PagarmeProvider implements IPaymentProvider {
  public async pay({
    payment_method,
    amount,
    customer,
    card_hash,
  }: ICreateTransaction): Promise<IResponse> {
    const client = await pagarme.client.connect({
      api_key: process.env.APP_PAGARME_ENCRYPTION_KEY,
    });

    const transactionCreated = await client.transactions.create({
      card_hash,
      amount,
      customer,
      payment_method,
    });

    return transactionCreated;
  }
}
