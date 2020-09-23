import { Router } from 'express';
import usersRouter from '@modules/user/infra/http/routes/user.routes';
import postsRouter from '@modules/post/infra/http/routes/post.routes';
import authRouter from '@modules/user/infra/http/routes/auth.routes';
import courseRouter from '@modules/course/infra/http/routes/course.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/posts', postsRouter);
routes.use('/auth', authRouter);
routes.use('/courses', courseRouter);

export default routes;
