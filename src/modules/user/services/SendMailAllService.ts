import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class SendMailResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(
    user_logged: string,
    html: string,
    subject: string,
  ): Promise<void> {
    const usersToSend = await this.usersRepository.findAll();
    const user_logged_data = await this.usersRepository.findByUuid(user_logged);

    if (!user_logged_data) {
      throw new AppError('User logged not found');
    }

    if (user_logged_data.level !== 'ADM') {
      throw new AppError('User no have permission for this');
    }

    if (usersToSend?.length <= 0) {
      throw new AppError('no registered users');
    }
    const emailsToSend = usersToSend.map(userToSend => {
      return userToSend.email;
    });

    await this.mailProvider.sendMailAll({
      to: emailsToSend,
      subject,
      html,
    });
  }
}

export default SendMailResetPasswordService;
