import Router from 'express';
import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import CourseController from '../controller/CourseController';

const courseController = new CourseController();
const courseRouter = Router();

courseRouter.post('/', ensureAuthenticate, courseController.create);
courseRouter.get('/', ensureAuthenticate, courseController.index);
courseRouter.get('/public', courseController.indexPublic);
courseRouter.put(
  '/update/:course_id',
  ensureAuthenticate,
  courseController.update,
);
courseRouter.get('/:id', ensureAuthenticate, courseController.findOne);
courseRouter.delete('/:courseId', ensureAuthenticate, courseController.delete);

courseRouter.get(
  '/admin/:id',
  ensureAuthenticate,
  courseController.findOneByAdmin,
);

export default courseRouter;
