import 'reflect-metadata';
import * as express from 'express';
import Container, { Service } from 'typedi';
import ProductController from '../controllers/product/productController';

@Service()
class ProductRouter {
  constructor(private readonly productController: ProductController) {}

  getRouter() {
    const router = express.Router();
    router.get('', (req, res) =>
      this.productController.getAllProduct(req, res)
    );

    router.get('/:id', (req, res) =>
      this.productController.getProduct(req, res)
    );

    return router;
  }
}

const productRouter = Container.get(ProductRouter);
const routes = productRouter.getRouter();

export default routes;
