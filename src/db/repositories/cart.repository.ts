import { Service } from 'typedi';

import { ICart } from './../models/Cart';
import { Cart, Product } from '../models';

@Service()
class CartRepository {
  async getAllCarts(): Promise<ICart[]> {
    return await Cart.findAll({ include: Product });
  }

  async getCartByProductId(productId: string): Promise<ICart | null> {
    return await Cart.findOne({ where: { productId } });
  }

  async removeFromCartByProductId(productId: string): Promise<void> {
    await Cart.destroy({ where: { productId } });
  }

  async updateCartQuantity(productId: string, newQty: number): Promise<ICart> {
    const cart = await Cart.findOne({ where: { productId } });
    if (!cart) {
      throw new Error('not found');
    }
    cart.qty = newQty;
    await cart.save();
    return cart;
  }
}

export default CartRepository;
