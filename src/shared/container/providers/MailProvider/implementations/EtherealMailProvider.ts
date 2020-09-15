import nodemailer, { Transporter } from 'nodemailer';

import SendMailDTO from '@shared/dtos/SendMailDTO';

import SendMailAllDTO from '@shared/dtos/SendMailAllDTO';

import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    html,
  }: SendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Florescer',
        address: from?.email || 'equipe@florescer.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html,
    });

    console.log('Message sent: %s', message.id);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

  public async sendMailAll({
    to,
    from,
    subject,
    html,
  }: SendMailAllDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Florescer',
        address: from?.email || 'equipe@florescer.com.br',
      },
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', message.id);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
