import Router from 'express';
import CourseController from '../controller/CourseController';

const courseController = new CourseController();
const userRouter = Router();

userRouter.post('/', courseController.create);
userRouter.get('/', courseController.index);

export default userRouter;

// Obter um unico curso
// deletar um curso
// Adicionar um curso ao usuario
