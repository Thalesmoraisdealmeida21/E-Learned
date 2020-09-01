import Router from 'express';
import UsersController from '../controllers/UserController';

const usersController = new UsersController();
const userRouter = Router();

userRouter.post('/', usersController.create);

export default userRouter;
