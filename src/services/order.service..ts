import { Service } from 'typedi';

import { OrderLineDto } from '../controllers/order/dtos/orderLine.dto';
import { CreateOrderInput, OrderStatus } from '../db/models/Order';
import { CartRepository, OrderRepository } from '../db/repositories';
import ProductService from './product.service.';

@Service()
class OrderService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService
  ) {}

  public async createOrder(orderDtos: Array<OrderLineDto>): Promise<string[]> {
    const errorList: Array<string> = [];

    await Promise.all(
      orderDtos.map(async ({ productId, qty }) => {
        const remaingQty = await this.productService.getProductRemainingQty(
          productId
        );
        if (remaingQty < qty) {
          errorList.push(`Not enough stock for productId: '${productId}'.`);
        } else {
          // store order
          const order = Object.assign({
            productId,
            qty
          }) as CreateOrderInput;
          this.orderRepository.createOrder(order);
          this.cartRepository.updateCartQuantity(productId, qty);
          this.productService.updateProductMaxQty(productId, qty);
        }
      })
    );
    return errorList;
  }
}

export default OrderService;
