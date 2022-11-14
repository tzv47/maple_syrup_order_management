import 'reflect-metadata';
import * as express from 'express';
import Container, { Service } from 'typedi';
import { OrderController } from '../controllers';

@Service()
class OrderRouter {
  constructor(private readonly orderController: OrderController) {}

  getRouter() {
    const router = express.Router();
    router.post('', (req, res, next) =>
      this.orderController.placeOrder(req, res, next)
    );

    return router;
  }
}

const orderRouter = Container.get(OrderRouter);
const routes = orderRouter.getRouter();

export default routes;
