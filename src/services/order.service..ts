import { Service } from 'typedi';

import { OrderLineDto } from '../controllers/order/dtos/orderLine.dto';
import { CartRepository } from '../db/repositories';
import ProductService from './product.service.';

@Service()
class OrderService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productService: ProductService
  ) {}

  public async createOrder(orderDtos: Array<OrderLineDto>): Promise<string[]> {
    const errorList: Array<string> = [];

    await Promise.all(
      orderDtos.map(async ({ productId, qty }) => {
        const cart = await this.cartRepository.getCartByProductId(productId);
        const remaingQty = await this.productService.getProductRemainingQty(
          productId
        );
        if (!cart) {
          errorList.push(`No cart found for productId: '${productId}'.`);
        } else if (remaingQty < qty) {
          errorList.push(`Not enough stock for productId: '${productId}'.`);
        } else {
          this.cartRepository.removeFromCartByProductId(productId);
          this.productService.updateProductMaxQty(
            productId,
            remaingQty - (cart.qty - qty)
          );
        }
      })
    );
    return errorList;
  }
}

export default OrderService;
