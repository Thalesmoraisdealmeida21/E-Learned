import ICreateTransaction from '@modules/order/dtos/ICreateTransaction';

interface IResponse {
  status: string;
  payment_method: string;
  boleto_url: string;
  boleto_barcode: string;
  id: string;
  boleto_expiration_date: string;
}

export default interface IPaymentProvider {
  pay(transaction: ICreateTransaction): Promise<IResponse>;
}
