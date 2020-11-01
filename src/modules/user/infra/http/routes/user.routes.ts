import Router from 'express';
import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import UsersController from '../controllers/UserController';
import UserCoursesController from '../controllers/UserCoursesController';
import UserOrdersController from '../controllers/UserOrderController';

const usersController = new UsersController();
const usersCoursesController = new UserCoursesController();
const userOrdersController = new UserOrdersController();

const userRouter = Router();

userRouter.post('/', usersController.create);
userRouter.get('/', ensureAuthenticate, usersController.index);

userRouter.get('/myorders', ensureAuthenticate, userOrdersController.index);
userRouter.get('/search', ensureAuthenticate, usersController.search);
userRouter.post('/sendmail', ensureAuthenticate, usersController.sendMail);

userRouter.post(
  '/sendmail/all',
  ensureAuthenticate,
  usersController.sendAllMail,
);

userRouter.get('/courses', ensureAuthenticate, usersCoursesController.index);
userRouter.get('/:user_id', ensureAuthenticate, usersController.show);
userRouter.post('/courses', ensureAuthenticate, usersCoursesController.create);
userRouter.put('/', ensureAuthenticate, usersController.updateUser);
userRouter.put(
  '/courses',
  ensureAuthenticate,
  usersCoursesController.updateLimit,
);

export default userRouter;
