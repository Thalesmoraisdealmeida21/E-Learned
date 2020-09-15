import ISendMailDTO from '@shared/dtos/SendMailDTO';
import ISendMailAllDTO from '@shared/dtos/SendMailAllDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
  sendMailAll(data: ISendMailAllDTO): Promise<void>;
}
