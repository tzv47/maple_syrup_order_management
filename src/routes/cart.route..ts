import 'reflect-metadata';
import * as express from 'express';
import Container, { Service } from 'typedi';
import CartController from '../controllers/cart/cartController';

@Service()
class CartRouter {
  constructor(private readonly cartController: CartController) {}

  getRouter() {
    const router = express.Router();
    router.get('', (req, res) => this.cartController.getCart(req, res));

    router.patch('/product/:productId', (req, res) =>
      this.cartController.updateCartQty(req, res)
    );

    router.delete('/product/:productId', (req, res) =>
      this.cartController.deleteCart(req, res)
    );

    return router;
  }
}

const cartRouter = Container.get(CartRouter);
const routes = cartRouter.getRouter();

export default routes;
