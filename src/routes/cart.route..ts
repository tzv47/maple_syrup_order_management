import 'reflect-metadata';
import * as express from 'express';
import Container, { Service } from 'typedi';
import { CartController } from '../controllers';

@Service()
class CartRouter {
  constructor(private readonly cartController: CartController) {}

  getRouter() {
    const router = express.Router();
    router.get('', (req, res, next) =>
      this.cartController.getCart(req, res, next)
    );

    router.post('', (req, res, next) =>
      this.cartController.createCart(req, res, next)
    );

    router.patch('/product/:productId', (req, res, next) =>
      this.cartController.updateCartQty(req, res, next)
    );

    router.delete('/product/:productId', (req, res, next) =>
      this.cartController.deleteCart(req, res, next)
    );

    return router;
  }
}

const cartRouter = Container.get(CartRouter);
const routes = cartRouter.getRouter();

export default routes;
