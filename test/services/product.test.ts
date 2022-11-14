import { ProductService } from '../../src/services';
import { CartRepository, ProductRepository } from '../../src/db/repositories';
import { products } from './../data/product';
import { carts } from './../data/cart';

const cartRepository: jest.Mocked<CartRepository> = {
  getCartByProductId: jest.fn(),
  getAllCarts: jest.fn(),
  createCart: jest.fn(),
  removeFromCartByProductId: jest.fn(),
  updateCartQuantity: jest.fn()
};

const productRepository: jest.Mocked<ProductRepository> = {
  getAllProducts: jest.fn(),
  getById: jest.fn(),
  updateMaxqty: jest.fn()
};

const _products = products;

describe('ProductServiceTest', () => {
  let productService: ProductService;
  beforeEach(() => {
    jest.restoreAllMocks();
    productRepository.getAllProducts = jest
      .fn()
      .mockImplementation(() => Promise.resolve(products));
    productRepository.getById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(products[0]));
    cartRepository.getCartByProductId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(carts[0]));

    productService = new ProductService(productRepository, cartRepository);
  });

  describe('* Happy path test', () => {
    it('should return a single product given the id', async () => {
      const productId = '001';

      const product = await productService.getProduct(productId);

      expect(productRepository.getById).toBeCalledWith(productId);
    });

    it('should get all product', async () => {
      const products = await productService.getAll(null);

      expect(products.length).toEqual(3);
    });

    it('should get product type AMBER', async () => {
      productRepository.getAllProducts = jest
        .fn()
        .mockImplementation(() => Promise.resolve([_products[0]]));

      const products = await productService.getAll('Amber');

      expect(products.length).toEqual(1);
    });

    it('should get product remaing qty', async () => {
      const productId = '001';

      const remaingQty = await productService.getProductRemainingQty(productId);

      expect(remaingQty).toEqual(3);
    });

    it('should update product max qty', async () => {
      const productId = '001';

      await productService.updateProductMaxQty(productId, 100);

      expect(productRepository.updateMaxqty).toBeCalledWith(productId, 100);
    });
  });
});
