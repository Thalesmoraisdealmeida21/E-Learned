import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('This e-mail already in use');
    }

    const passwordEncrypted = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      name,
      password: passwordEncrypted,
    });

    if (!user) {
      throw new AppError('Is not possible create to user check log system');
    }

    this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Bem Vindo',
      html: `<h4 style="text-align: center;"><img style="display: block; margin-left: auto; margin-right: auto; border-radius: 8px" src="https://i.ibb.co/9qX7vrH/bgLogo.png" width="668" height="229" />Bem vindo, ${user.name}</h4>
      <p>&nbsp;</p>
      <table style="width: 482px;" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
      <tbody>
      <tr>
      <td style="width: 467.219px;" align="left">
      <p>Seja muito bem vindo !&nbsp;</p>
      <p>Sua conta foi criada com sucesso clique no bot&atilde;o abaixo para fazer o seu login</p>
      <p>&nbsp;</p>

      <a href="${process.env.APP_WEB_URL}" style="height: 23px;
      padding: 13px;
      background: #6097bd;
      width: 250px;
      text-decoration: none;
      color: white;
      border-radius: 8px;
      text-align: center;
      align-items: center;
      margin: 10px auto;">Fazer Login</a>
      <p>&nbsp;</p>
      <p>Em caso de d&uacute;vidas entre em contato conosco pelo e-mail equipe@florescereduca&ccedil;&atilde;o.com.br</p>
      <p>&nbsp;</p>.

      <p><strong>Atenciosamento:</strong></p>
      <p><strong>Equipe Florescer</strong></p>
      </td>
      </tr>
      </tbody>
      </table>`,
    });

    return user;
  }
}

export default CreateUserService;
