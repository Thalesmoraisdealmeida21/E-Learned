import Router from 'express';
import AuthController from '../controllers/AuthController';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/', authController.login);

export default authRouter;
