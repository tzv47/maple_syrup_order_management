import Cart from '../../db/models/Cart';
import { CartLineDto } from './dtos/cart.dto';

class CartMapper {
  public toCartLineDtos(carts: Array<Cart>): Array<CartLineDto> {
    return carts.map((cart) => {
      const product = cart.product;
      return Object.assign({
        productId: cart.productId,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: cart.qty
      });
    });
  }
}

export default new CartMapper();
