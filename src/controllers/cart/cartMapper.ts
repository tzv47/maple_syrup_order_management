import { ICart } from '../../db/models/Cart';
import { CartLineDto } from './dtos/cart.dto';

class CartMapper {
  public toCartLineDtos(carts: Array<ICart>): Array<CartLineDto> {
    return carts.map((cart) =>
      Object.assign({
        productId: cart.productId,
        qty: cart.qty
      })
    );
  }
}

export default new CartMapper();