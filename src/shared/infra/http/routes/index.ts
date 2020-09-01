import { Router } from 'express';
import usersRouter from '@modules/user/infra/http/routes/user.routes';
import authRouter from '@modules/user/infra/http/routes/auth.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);

export default routes;
