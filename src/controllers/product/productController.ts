import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { ProductService } from '../../services/';
import productMapper from './productMapper';

@Service()
class ProductController {
  constructor(private readonly productService: ProductService) {}

  public async getAllProduct(req: Request, res: Response, next: NextFunction) {
    const proudctType = req.query?.type as string | null;
    try {
      const productList = await this.productService.getAll(proudctType);
      res
        .send(
          productList.map((product) =>
            productMapper.toCatalogueItemDto(product)
          )
        )
        .status(200);
    } catch (error) {
      next(error);
    }
  }

  public async getProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id;
    try {
      const product = await this.productService.getProduct(productId);
      const remainingAmount = await this.productService.getProductRemainingQty(
        productId
      );
      res
        .send(productMapper.toMapleSyrupDto(product!!, remainingAmount))
        .status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
