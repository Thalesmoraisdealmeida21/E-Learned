import Router from 'express';
import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import OrderController from '@modules/order/infra/http/controllers/OrderController';

const orderController = new OrderController();
const orderRouter = Router();

orderRouter.post('/', ensureAuthenticate, orderController.create);

orderRouter.get('/', ensureAuthenticate, orderController.findAll);

orderRouter.post('/pay/:orderId', orderController.pay);
orderRouter.get('/:orderId', ensureAuthenticate, orderController.findOne);

export default orderRouter;
