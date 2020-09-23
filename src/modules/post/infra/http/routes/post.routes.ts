import Router from 'express';
import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import PostController from '../controllers/PostController';

const postController = new PostController();
const postRouter = Router();

postRouter.post('/', ensureAuthenticate, postController.create);
postRouter.get('/', postController.index);
postRouter.get('/:id', postController.findOne);
postRouter.put('/:id', ensureAuthenticate, postController.update);

export default postRouter;
