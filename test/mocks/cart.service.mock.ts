import { CreateCartInput } from './../../src/db/models/Cart';
import { carts } from './../data/cart';
import { createMock } from 'ts-jest-mock';
import { CartRepository } from '../../src/db/repositories';

const mockCartRepository = createMock<CartRepository>({
  getAllCarts: async () => {
    return carts;
  },
  getCartByProductId: async (productId: string) => {
    return carts.find((cart) => cart.productId == productId)!!;
  },
  createCart: async (data: CreateCartInput) => {
    return carts[0];
  },
  removeFromCartByProductId: async (productId: string) => {
    carts.filter((cart) => cart.productId != productId)!!;
  },
  updateCartQuantity: async (productId: string, newQty: number) => {
    const cart = carts.find((cart) => cart.productId == productId)!!;
    cart.qty = newQty;
    return cart;
  }
});

export default mockCartRepository;