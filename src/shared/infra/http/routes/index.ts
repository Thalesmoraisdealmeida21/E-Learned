import { Router } from 'express';
import usersRouter from '@modules/user/infra/http/routes/user.routes';
import authRouter from '@modules/user/infra/http/routes/auth.routes';
import courseRouter from '@modules/course/infra/http/routes/course.routes';

import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/courses', ensureAuthenticate, courseRouter);

export default routes;
