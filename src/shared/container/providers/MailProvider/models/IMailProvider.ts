import ISendMailDTO from '@shared/dtos/SendMailDTO';

export default interface IMailProvider{

    sendMail(data: ISendMailDTO): Promise<void>;

}
