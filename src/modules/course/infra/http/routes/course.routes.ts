import Router from 'express';
import CourseController from '../controller/CourseController';

const courseController = new CourseController();
const userRouter = Router();

userRouter.post('/', courseController.create);
userRouter.get('/', courseController.index);

export default userRouter;

/**
 * Obter um unico curso
 *  - mostrar somente se o usuário tem acesso a este curso (vendo na tabela courses_users)
 * Obter Cursos do usuário
 *  - Listar todos os cursos que o usuário tenha acesso.
 */
// deletar um curso
// Adicionar um curso ao usuario
