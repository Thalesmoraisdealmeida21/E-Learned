import Router from 'express';
import CourseController from '../controller/CourseController';

const courseController = new CourseController();
const courseRouter = Router();

courseRouter.post('/', courseController.create);
courseRouter.get('/', courseController.index);
courseRouter.get('/:id', courseController.findOne);

export default courseRouter;

/**
 * Obter um unico curso
 *  - mostrar somente se o usuário tem acesso a este curso (vendo na tabela courses_users)
 * Obter Cursos do usuário
 *  - Listar todos os cursos que o usuário tenha acesso.
 */
// deletar um curso
// Adicionar um curso ao usuario
