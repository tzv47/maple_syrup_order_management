import { CreateCartInput } from './../models/Cart';
import { plainToInstance } from 'class-transformer';
import { Service } from 'typedi';

import { Cart, Product } from '../models';

@Service()
class CartRepository {
  async getAllCarts(query: {} = {}): Promise<Cart[]> {
    return await Cart.findAll({
      where: query,
      include: [{ model: Product, as: 'product' }]
    });
  }

  async getCartByProductId(
    productId: string,
    adttionalQuery: {} = {}
  ): Promise<Cart | null> {
    const query = { productId, ...adttionalQuery };
    return await Cart.findOne({ where: query });
  }

  async createCart(createCartInput: CreateCartInput): Promise<Cart> {
    const cart = plainToInstance(Cart, createCartInput);

    return await cart.save();
  }

  async removeFromCartByProductId(
    productId: string,
    adttionalQuery: {} = {}
  ): Promise<void> {
    const query = { productId, ...adttionalQuery };
    await Cart.destroy({ where: query });
  }

  async updateCartQuantity(
    productId: string,
    newQty: number,
    adttionalQuery: {} = {}
  ): Promise<Cart> {
    const query = { productId, ...adttionalQuery };
    const cart = await Cart.findOne({ where: query });
    if (!cart) {
      throw new Error('not found');
    }
    cart.qty = newQty;
    await cart.save();
    return cart;
  }
}

export default CartRepository;
