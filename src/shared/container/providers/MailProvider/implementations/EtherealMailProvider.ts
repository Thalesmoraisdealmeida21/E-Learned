import nodemailer, { Transporter } from 'nodemailer';

import SendMailDTO from '@shared/dtos/SendMailDTO';
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
    link,
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
      html: `<style>
          .message-content {
            font-family: Arial, Helvetica, sans-serif;
            max-width: 600px;
            font-size: 18px;
            line-height: 21px;
          }
        </style>S

        <div class="message-content">
          <p>Olá, ${to.name} </p>
          <p>Parece que uma troca de senha para sua conta foi solicitada</p>
          <p>Se foi você, então clique no link abaixo para escolher uma nova senha</p>
          <p>
            <a href="${link}">Resetar minha senha</a>
          </p>

          <p>Se não foi você, então descarte este e-mail</p>
          <p>
            Obrigado !<br />
            <strong>Equipe Florescer</strong>
          </p>
        `,
    });

    console.log('Message sent: %s', message.id);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
