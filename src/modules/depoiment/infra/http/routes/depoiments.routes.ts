import Router from 'express';
import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import DepoimentsCotnroller from '@modules/depoiment/infra/http/controllers/DepoimentsCotnroller';

const depoimentController = new DepoimentsCotnroller();
const depoimentRouter = Router();

depoimentRouter.put('/:id', ensureAuthenticate, depoimentController.update);
depoimentRouter.post('/', ensureAuthenticate, depoimentController.create);

depoimentRouter.get('/', depoimentController.index);
depoimentRouter.get('/:idDepoiment', depoimentController.findOne);

depoimentRouter.delete(
  '/:depoimentId',
  ensureAuthenticate,
  depoimentController.delete,
);

export default depoimentRouter;
