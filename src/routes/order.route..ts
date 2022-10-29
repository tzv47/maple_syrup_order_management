import 'reflect-metadata';
import * as express from 'express';
import Container, { Service } from 'typedi';
import OrderController from '../controllers/order/orderController';

@Service()
class OrderRouter {
  constructor(private readonly orderController: OrderController) {}

  getRouter() {
    const router = express.Router();
    router.post('', (req, res) => this.orderController.placeOrder(req, res));

    return router;
  }
}

const orderRouter = Container.get(OrderRouter);
const routes = orderRouter.getRouter();

export default routes;
