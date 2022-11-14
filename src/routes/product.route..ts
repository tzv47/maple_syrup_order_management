import 'reflect-metadata';
import * as express from 'express';
import Container, { Service } from 'typedi';
import { ProductController } from '../controllers';

@Service()
class ProductRouter {
  constructor(private readonly productController: ProductController) {}

  getRouter() {
    const router = express.Router();
    router.get('', (req, res, next) =>
      this.productController.getAllProduct(req, res, next)
    );

    router.get('/:id', (req, res, next) =>
      this.productController.getProduct(req, res, next)
    );

    return router;
  }
}

const productRouter = Container.get(ProductRouter);
const routes = productRouter.getRouter();

export default routes;
