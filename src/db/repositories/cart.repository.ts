import { Service } from 'typedi';

import { Cart, Product } from '../models';

@Service()
class CartRepository {
  async getAllCarts(): Promise<Cart[]> {
    return await Cart.findAll({
      include: [{ model: Product, as: 'product' }]
    });
  }

  async getCartByProductId(productId: string): Promise<Cart | null> {
    return await Cart.findOne({ where: { productId } });
  }

  async removeFromCartByProductId(productId: string): Promise<void> {
    await Cart.destroy({ where: { productId } });
  }

  async updateCartQuantity(productId: string, newQty: number): Promise<Cart> {
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
