import { OrderService } from '../../src/services';
import ProductService from '../../src/services/product.service.';
import { CartRepository } from '../../src/db/repositories';
import { carts } from './../data/cart';

const cartRepository: jest.Mocked<CartRepository> = {
  getCartByProductId: jest.fn(),
  getAllCarts: jest.fn(),
  createCart: jest.fn(),
  removeFromCartByProductId: jest.fn(),
  updateCartQuantity: jest.fn()
};

const productService = new (<new () => ProductService>(
  ProductService
))() as jest.Mocked<ProductService>;

describe('OrderServiceTest', () => {
  let orderService: OrderService;

  describe('* Happy path test', () => {
    beforeEach(() => {
      productService.getProductRemainingQty = jest
        .fn()
        .mockImplementation(() => Promise.resolve(5));
      productService.updateProductMaxQty = jest.fn();
      cartRepository.getCartByProductId = jest
        .fn()
        .mockImplementation(() => Promise.resolve(carts[0]));
      orderService = new OrderService(cartRepository, productService);
    });
    it('should create a single order', async () => {
      const productId = '001';

      const errorList = await orderService.createOrder(
        [{ productId, qty: 2 }],
        'abc'
      );

      expect(cartRepository.getCartByProductId).toBeCalled();
      expect(productService.getProductRemainingQty).toBeCalled();
      expect(cartRepository.removeFromCartByProductId).toBeCalled();
      expect(cartRepository.removeFromCartByProductId).toBeCalledWith(
        productId
      );
      expect(productService.updateProductMaxQty).toBeCalled();
      expect(productService.updateProductMaxQty).toBeCalledWith(productId, 5);
      expect(errorList.length).toEqual(0);
    });

    it('should create a multiple order', async () => {
      const errorList = await orderService.createOrder(
        [
          { productId: '001', qty: 2 },
          { productId: '002', qty: 4 },
          { productId: '003', qty: 4 }
        ],
        'abc'
      );

      expect(cartRepository.getCartByProductId).toBeCalledTimes(3);
      expect(productService.getProductRemainingQty).toBeCalledTimes(3);
      expect(cartRepository.removeFromCartByProductId).toBeCalledTimes(3);
      expect(productService.updateProductMaxQty).toBeCalledTimes(3);
      expect(errorList.length).toEqual(0);
    });
  });

  describe('* Error path test', () => {
    beforeEach(() => {
      productService.getProductRemainingQty = jest
        .fn()
        .mockImplementation(() => Promise.resolve(5));
      productService.updateProductMaxQty = jest.fn();
      cartRepository.getCartByProductId = jest
        .fn()
        .mockImplementation(() => Promise.resolve(carts[0]));
      orderService = new OrderService(cartRepository, productService);
    });

    it('should has not enough stock error', async () => {
      const errorList = await orderService.createOrder(
        [
          { productId: '001', qty: 2 },
          { productId: '002', qty: 30 }
        ],
        'abc'
      );

      expect(cartRepository.getCartByProductId).toBeCalledTimes(2);
      expect(productService.getProductRemainingQty).toBeCalledTimes(2);
      expect(cartRepository.removeFromCartByProductId).toBeCalledTimes(1);
      expect(productService.updateProductMaxQty).toBeCalledTimes(1);
      expect(errorList.length).toEqual(1);
      expect(errorList[0]).toEqual(`Not enough stock for productId: '002'.`);
    });

    it('should has No cart found error', async () => {
      cartRepository.getCartByProductId = jest.fn();

      const errorList = await orderService.createOrder(
        [{ productId: '001', qty: 2 }],
        'abc'
      );

      expect(cartRepository.getCartByProductId).toBeCalledTimes(1);
      expect(productService.getProductRemainingQty).toBeCalledTimes(1);
      expect(cartRepository.removeFromCartByProductId).toBeCalledTimes(0);
      expect(productService.updateProductMaxQty).toBeCalledTimes(0);
      expect(errorList.length).toEqual(1);
      expect(errorList[0]).toEqual(`No cart found for productId: '001'.`);
    });
  });
});
