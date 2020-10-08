import Router from 'express';
import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';

import multer from 'multer';
import uploadConfig from '@config/upload';
import PostController from '../controllers/PostController';
import ImagePostController from '../controllers/ImagePostController';

const postController = new PostController();
const imagePostController = new ImagePostController();
const postRouter = Router();

const upload = multer(uploadConfig);

postRouter.post('/', ensureAuthenticate, postController.create);
postRouter.get('/', postController.index);
postRouter.get('/:id', postController.findOne);
postRouter.put('/:id', ensureAuthenticate, postController.update);
postRouter.delete('/:id', ensureAuthenticate, postController.delete);
postRouter.delete('/file/:id', ensureAuthenticate, imagePostController.delete);

postRouter.patch(
  '/',
  ensureAuthenticate,
  upload.single('postImage'),
  postController.uploadImage,
);

export default postRouter;
