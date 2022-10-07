import { carts } from "../data/cart";
import { ICart } from "../models";

class CartService {
  public getAll(): Array<ICart> {
    return carts;
  }

  public findByProductId(productId: String): ICart | null {
    return carts.find((cart) => cart.productId === productId) || null;
  }

  public removeFromCartByProductId(productId: String): any {
    const cart = this.findByProductId(productId);
    return carts.filter((_cart) => _cart.id !== cart?.id);
  }

  public updateCartQuantity(productId: string, newQty: number): ICart {
    const cart = this.findByProductId(productId);
    cart!!.qty = newQty;
    return cart!!;
  }
}

export default new CartService();
