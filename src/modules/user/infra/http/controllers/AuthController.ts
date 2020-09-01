import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';
import SendMailResetPasswordService from '../../../services/SendMailResetPasswordService';

export default class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const authUser = container.resolve(AuthenticateUserService);
    const { email, password } = request.body;

    const auth = await authUser.execute({ email, password });

    return response.json(auth);
  }

  public async sendMailPassword(request: Request, response: Response): Promise<Response> {
      const {email} = request.body;
      const sendMailResetPassword = container.resolve(SendMailResetPasswordService)

      await sendMailResetPassword.execute(email);

      return response.status(204).json();
  }
}
