import { ProductType } from './../../src/db/models/Product';
import { ProductService } from '../../src/services';
import { CartRepository, ProductRepository } from '../../src/db/repositories';
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

  describe('* Get Product', () => {
    it('should return a single product given the id', async () => {
      const productId = '001';

      const product = await productService.getProduct(productId);

      expect(product.id).toEqual(productId);
      expect(product.type).toEqual(ProductType.AMBER);
    });
  });
});
