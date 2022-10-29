import { Service } from 'typedi';
import { ICart } from '../models/Cart';
import CartRepository from '../repositories/cart.repository';

@Service()
class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async getAll(): Promise<ICart[]> {
    return await this.cartRepository.getAllCarts();
  }

  public async findByProductId(productId: string): Promise<ICart | null> {
    return await this.cartRepository.getCartByProductId(productId);
  }

  public async removeFromCartByProductId(productId: string): Promise<void> {
    await this.cartRepository.removeFromCartByProductId(productId);
  }

  public async updateCartQuantity(
    productId: string,
    newQty: number
  ): Promise<ICart> {
    return await this.cartRepository.updateCartQuantity(productId, newQty);
  }
}

export default CartService;
