import { ProductType } from './../../src/db/models/Product';
import { ProductService } from '../../src/services';
import mockProductRepository from '../mocks/product.service.mock';
import mockCartRepository from '../mocks/cart.service.mock';

describe('ProductServiceTest', () => {
  let productService: ProductService;
  beforeEach(() => {
    productService = new ProductService(
      mockProductRepository,
      mockCartRepository
    );
  });

  describe('* Happy path test', () => {
    it('should return a single product given the id', async () => {
      const productId = '001';

      const product = await productService.getProduct(productId);

      expect(product.id).toEqual(productId);
      expect(product.type).toEqual(ProductType.AMBER);
    });

    it('should get all product', async () => {
      const products = await productService.getAll();
      expect(products.length).toEqual(3);
    });

    it('should get product remaing qty', async () => {
      const productId = '001';
      const remaingQty = await productService.getProductRemainingQty(productId);
      expect(remaingQty).toEqual(3);
    });

    it('should update product max qty', async () => {
      const productId = '001';
      const { maxQty } = await productService.updateProductMaxQty(
        productId,
        100
      );
      expect(maxQty).toEqual(100);
    });
  });
});
