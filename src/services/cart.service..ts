import { Service } from 'typedi';
import Cart from '../db/models/Cart';
import { CartRepository } from '../db/repositories';

@Service()
class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async getAll(user: string): Promise<Cart[]> {
    return await this.cartRepository.getAllCarts({ user });
  }

  public async findByProductId(
    productId: string,
    user: string
  ): Promise<Cart | null> {
    return await this.cartRepository.getCartByProductId(productId, { user });
  }

  public async removeFromCartByProductId(
    productId: string,
    user: string
  ): Promise<void> {
    await this.cartRepository.removeFromCartByProductId(productId, { user });
  }

  public async updateCartQuantity(
    productId: string,
    newQty: number,
    user: string
  ): Promise<Cart> {
    return await this.cartRepository.updateCartQuantity(productId, newQty, {
      user
    });
  }
}

export default CartService;
