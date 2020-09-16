import nodemailer, { Transporter } from 'nodemailer';

import SendMailDTO from '@shared/dtos/SendMailDTO';

import SendMailAllDTO from '@shared/dtos/SendMailAllDTO';

import mailConfig from '@config/mail';

import aws from 'aws-sdk';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    html,
  }: SendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    const message = await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
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
        address: from?.email || 'equipe@florescereducacao.com.br',
      },
      bcc: to,
      subject,
      html,
    });

    console.log('Message sent: %s', message.id);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
