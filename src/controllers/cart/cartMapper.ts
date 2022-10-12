import { ICart } from '../../models';
import { CartLineDto } from './dtos/cart.dto';

class CartMapper {
  public toCartLineDtos(carts: Array<ICart>): Array<CartLineDto> {
    return carts.map((cart) =>
      Object.assign({
        productId: cart.productId,
        name: cart.name,
        image: cart.image,
        price: cart.price,
        qty: cart.qty
      })
    );
  }
}

export default new CartMapper();
