import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";


import {hash} from 'bcryptjs';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";

@injectable()
export class SendMailResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}


  public async execute(email: string): Promise<void>{
      const user = await this.usersRepository.findByEmail(email);

      if(!user){
        throw new AppError('User does not exists');
      }

      const token  = await hash(user.id, 8);

      const link = `http://localhost:3000/reset-password?token=${token}`;

      await this.mailProvider.sendMail({
        to: {
            name: user.name,
            email: user.email
        },
        subject: 'Recuperação de Senha',
        link
      });








  }
}


export default SendMailResetPasswordService;
