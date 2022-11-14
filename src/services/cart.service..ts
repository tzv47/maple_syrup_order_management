import { Service } from 'typedi';
import Cart from '../db/models/Cart';
import { CartRepository } from '../db/repositories';
import { CreateCartDto } from './../controllers/cart/dtos/create-cart.dto';

@Service()
class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  public async getAll(user: string): Promise<Cart[]> {
    return await this.cartRepository.getAllCarts({ user });
  }

  public async createCart(
    { productId, qty }: CreateCartDto,
    user: string
  ): Promise<Cart> {
    const existingCart = await this.findByProductId(productId, user);

    if (existingCart) {
      return await this.updateCartQuantity(productId, qty, user);
    }

    return await this.cartRepository.createCart({
      productId: productId,
      qty: qty,
      user
    });
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
    const currentCart = await this.findByProductId(productId, user);
    if (!currentCart) {
      throw Error('No cart found for the product');
    }
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
